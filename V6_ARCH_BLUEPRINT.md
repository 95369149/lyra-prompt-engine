# Lyra V6.0 改造蓝图 (架构草图与迁移路径)

> 核心定位：从"写出一段很强的 prompt 润色器"，升级为"白话转标准 JSON 的跨模型上下文装配引擎"。
> 参考标准：2026 Context Engineering 最佳实践 (Karpathy / Anthropic)

## 1. 核心架构设计

Lyra V6.0 将由 5 个核心模块组成，主链路如下：
`intent parse -> context assemble -> vendor policy select -> prompt render -> structured output -> local validate -> repair retry`

### 目录结构树

```text
lyra-prompt-engine/
├── src/
│   ├── index.ts                # 总调度入口 (LyraEngine)
│   ├── schemas/                # 【新增】强约束契约层
│   │   ├── task_spec.v1.json   # 中间态：白话转标准任务
│   │   ├── app_response.v1.json# 最终态：给App的标准输出
│   │   └── business/           # 业务子类 (文案、摘要、提取等)
│   ├── assembler/              # 【新增】上下文装配器 (代潜 PROMPT bloat)
│   │   ├── role.ts             # 静态角色定义
│   │   ├── constraints.ts      # 规则与边界
│   │   └── format_guard.ts     # 结尾格式提醒 (解决 lost in the middle)
│   ├── policies/               # 【新增】模型特异性策略
│   │   ├── openai_reasoning.ts # 无显式 CoT、简单指令
│   │   ├── claude.ts           # XML 标签包裹
│   │   └── gemini.ts           # 扁平化 schema 适配
│   ├── adapters/               # 【新增】API 对接层
│   │   ├── openai.ts           # json_schema 模式
│   │   ├── gemini.ts           # responseJsonSchema 模式
│   │   └── grok.ts             # response_format 模式
│   └── validators/             # 【新增】结果治理层
│       ├── parse.ts            # Ajv schema 校验
│       └── repair.ts           # 不合规结果自动二次修复
├── PROMPT.md                   # 【瘦身】仅保留通用系统内核与文档索引
└── README.md                   # V6.0 更新说明与架构图
```

## 2. 现有 PROMPT.md 的拆解与瘦身

当前 V5.5 的 `PROMPT.md` 长达 800 行，在 V6.0 中必须瘦身并模块化。

### 🗑️ 该删除的内容
- **针对推理模型 (如 o1/o3/Claude 3.7) 的 "Think step by step" 显式 CoT 指令**：推理模型自带内部 CoT，显式指令会干扰性能。
- **所有长篇大论的"怎么做"（过程细节）**：改为"写意图不写细节"，直接用 Schema 兜底。
- **ALL-CAPS 咆哮式约束**（如 "YOU MUST"）：改用结构化字段。

### 🗄️ 该保留但下沉为独立配置/文档的内容
- **任务模式字典**（`[文本]`/`[代码]`/`[分析]`）：下沉为 `schemas/business/` 里的具体子 Schema。
- **3 个完整业务示例**：从主提示词中移出，变成 `tests/` 或 `few_shots/` 目录下的按需加载数据，不再全量塞给模型。
- **视觉生成协议 / 风格 Skill 协议**：变成独立的 `docs/` 或可选加载的 Context Block。

### ⚙️ 该保留并升级为系统内核的 (System Common)
- **核心身份**："你是 Lyra，上下文装配与结构化输出引擎"。
- **输出契约**："必须且只输出符合给定 Schema 的 JSON"。
- **失败与澄清原则**："信息不足时，使用 needs_clarification=true"。

## 3. 核心模块职责与接口定义

### A. Context Assembler (上下文装配器)
**职责**：把零散信息拼装成对模型最优的 Context，解决 "Lost in the middle"。
**输出结构**：
- Top: 核心任务目标 + Schema 强约束
- Middle: 业务背景 + Few-shot (按需)
- Bottom: `closing_format_guard` (最终时刻重申格式，禁止解释文本)

### B. Vendor Policy Select (模型家族策略)
**职责**：同一个 TaskSpec，针对不同模型生成不同的具体 Prompt。
- **OpenAI Reasoning**：干掉中间步骤说明，直接给目标和验证标准。
- **Claude**：用 `<task>`、`<rules>`、`<output_format>` XML 标签包裹。
- **Gemini**：不传递过深的嵌套 Schema，改用扁平结构描述。

### C. Repair Retry (修复重试器)
**职责**：如果模型返回的 JSON 不符合 AppResponse Schema，自动拦截。
**动作**：发送 Repair Prompt (`保持原字段不变，补齐缺失，删除多余，返回合法JSON`) 给模型，最多重试 1 次。

## 4. V5.5 到 V6.0 的最小迁移路径 (MVP)

不要一次性全改，按这三步走：

### Phase 1: 协议先行，跑通主链路 (1-2天)
- **目标**：跑通 `白话 -> TaskSpec -> Schema 校验`。
- **动作**：
  1. 在仓库建 `src/schemas.ts`，定义 `task_spec.v1` 和 `app_response.v1`。
  2. 建 `src/validators/` 引入 Ajv 进行校验。
  3. 将 PROMPT.md 的核心浓缩为一句话提示，搭配 Schema 进行测试。

### Phase 2: 适配器与架构分离 (2-3天)
- **目标**：实现 GPT / Gemini / Grok 的结构化输出对接。
- **动作**：
  1. 新建 `src/adapters/`，利用各家 SDK 的 `response_format` 或 `responseJsonSchema` 能力。
  2. 实现 `closing_format_guard` 策略。
  3. 初步落地 `repair.ts`。

### Phase 3: 提示词模块化与瘦身 (收尾)
- **目标**：彻底消灭臃肿的 PROMPT.md。
- **动作**：
  1. 把旧的示例和细分规则下沉到业务配置目录。
  2. 引入 `vendor_profile` 处理模型差异（如移除推理模型的 CoT）。
  3. 更新 README，发布 Lyra V6.0。