# 🔴 Lyra Prompt Engine

**自进化 AI 提示词编译引擎**

> 不是模板库，是编译器。将模糊需求 → 结构精确、可直接使用的 AI 提示词，会学习、会迭代、会适配不同模型。

[![Version](https://img.shields.io/badge/version-V6.0-red?style=flat-square)](PROMPT.md)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/95369149/lyra-prompt-engine?style=flat-square&color=yellow)](https://github.com/95369149/lyra-prompt-engine/stargazers)

---

## ⚡ 核心特性

| 特性 | 说明 |
|:-----|:-----|
| 🎯 **9 种编译模式** | 文本 / 代码 / 分析 / 创意 / 视觉 / Agent / 编排 / 风格 / **卡片（V6.0 新增）** |
| 🧬 **三层进化** | 会话内学习 → 知识刷新 → 版本迭代，越用越准 |
| 🎨 **视觉生成协议** | 覆盖 MJ / DALL-E / Flux / Seedance / Kling / Sora，12+ 场景模板 |
| ✍️ **8 维风格分析** | 本体论到情感浓度，精准定义写作风格，三阶段构建 Skill |
| 🤖 **多模型编排** | Orchestrator 拆解 + Worker 执行 + 7 分制质检，省 token 不省质量 |
| 🔴 **槽位化设计（V6.0）** | TaskSpec v2 支持 `slots` 参数化，提示词可复用、易维护 |
| 📱 **3 秒读懂原则（V6.0）** | 卡片/海报模式：信息少而准，手机端 3 秒看懂核心价值 |
| 🔍 **视觉 DNA 提取（V6.0）** | 从对象提取色彩/构图/质感/情绪，驱动统一画面风格 |
| 🧠 **模型感知** | 自动适配 Claude / GPT / Gemini / DeepSeek / 开源模型最佳实践 |
| 🚫 **12 项质量红线** | 每次输出前静默自检，不含"尽量""适当"等模糊词 |

---

## 🚀 快速开始

1. **复制核心提示词**：将 [`PROMPT.md`](PROMPT.md) 完整内容粘贴到任意 AI 对话的 System Prompt
2. **输入需求**：可选附带模式标签 `[文本]` `[视觉]` `[卡片]` 等
3. **获取结果**：Lyra 自动编译，输出结构化、可直接使用的提示词

```bash
# 示例：写文案
[文本] 帮我写一封拒绝供应商涨价的商务邮件，语气坚定但不失礼貌

# 示例：生成视频提示词
[视觉] 一台工业机器人在智能工厂中精准焊接，赛博朋克风格，Seedance 2.0

# 示例：高质感推荐卡片（V6.0 新增）
[卡片]
推荐对象：Public APIs GitHub 仓库
推荐理由：32 万星开源项目，1500+ 免费 API 端点，MIT 协议可商用
视觉 DNA：技术感、蓝色主调、代码背景、极简网格
```

---

## 🎛️ 编译模式一览

| 标签 | 用途 | 编译侧重 |
|:-----|:-----|:---------|
| `[文本]` | 文案、文章、公文、邮件 | 语气、受众、结构、字数控制 |
| `[代码]` | 编程、调试、架构设计 | 技术栈、约束条件、错误处理 |
| `[分析]` | 数据分析、研究、决策 | 推理链、证据要求、输出结构 |
| `[创意]` | 故事、广告、品牌、脑暴 | 风格锚定、情感基调、发散度控制 |
| `[视觉]` | 图片/视频生成提示词 | 写意图不写细节、参考素材语法、场景模板 |
| `[Agent]` | AI Agent/系统提示词设计 | 角色边界、工具调用、安全约束 |
| `[编排]` | 多模型协作 | 任务拆解、Worker 分发、质检 |
| `[风格]` | 写作风格 Skill 构建/迭代 | 8 维分析、三阶段构建、迭代进化 |
| `[结构化]` | 给 App/工作流/API 稳定调用 | schema 约束、字段校验、失败回退 |
| `[卡片]` **V6.0** | 高质感推荐卡片/海报/社交媒体图 | 苹果式克制、3 秒读懂、视觉 DNA 提取、槽位化参数 |

> 📎 视觉生成完整协议见 [`VISUAL.md`](VISUAL.md)  
> 📝 风格 Skill 完整协议见 [`PROMPT.md`](PROMPT.md) 的「风格 Skill 协议」章节

---

## 🧬 进化协议

| 指令 | 功能 |
|:-----|:-----|
| `Lyra /evolve` | 基于会话反馈输出优化建议 |
| `Lyra /changelog` | 版本变更历史 |
| `Lyra /audit` | 全面自检，报告过时技术和可优化模块 |
| `Lyra /benchmark [模型]` | 针对指定模型输出适配建议 |
| `Lyra /style` | 触发写作风格 Skill 迭代 |
| `Lyra /visual_dna` **V6.0** | 从推荐对象提取视觉 DNA 并生成槽位化提示词 |

---

## 📋 Changelog

### V6.1 (2026-05-08) — 融合小小东提示词工程
- **融合小小东提示词工程**（字体美学/植物图鉴/抓拍视角），升级视觉DNA提取、槽位化设计、进化机制
- **词义理解优先**：新增 `<semantic_analysis>` 槽位，自动触发词义→视觉隐喻链路
- **汤底+杠杆结构**：`base_soup`（可复用通用协议）+ `flavor_weak`（个性化气质追加）
- **三种核心模式升级**：
  - 词义可视化（字体美学）：词义理解→视觉隐喻→巨型文字骨架
  - 知识图鉴（植物图鉴）：极大主体+知识节点生长+信息层级
  - 抓拍视角（真实质感）：旁观感+自然状态+主体清晰+镜头语言
- **质量红线扩充到12项**：新增防退化自检（不做普通插画/电商海报/廉价模板）
- **进化链路升级**：`Lyra /evolve` 新增词义理解深度、视觉隐喻准确度、DNA提取质量反馈

### V6.0 (2026-05-05)
- **新增 `[卡片]` 模式**：融合高质感提示词原则，苹果式克制、3 秒读懂、视觉 DNA 提取
- **TaskSpec v2 槽位化**：新增 `visual_dna`、`aesthetic_constraints`、`slots` 字段，支持参数化提示词
- **视觉协议增强**：吸收 YouMind 风格模板库，支持 `{argument}` 参数化语法
- **质量红线扩充**：新增卡片/海报专项检查项（视觉 DNA、信息密度、手机可读性）
- **进化指令新增**：`Lyra /visual_dna` 触发视觉 DNA 提取流程

### V5.5 (2026-03-13)
- 新增三个完整业务示例（文章生成、营销文案、App JSON）
- 补完 TaskSpec → System Prompt → User Prompt → Output Contract 完整链路

### V5.0 (2026-02-15)
- 新增"写意图不写细节"核心原则
- 新增视频生成 11 场景模板库
- 新增写作风格 Skill 协议（四步法 + 迭代机制）

> 完整历史见 [`PROMPT.md`](PROMPT.md) 末尾 Changelog 章节

---

## 📦 项目结构

```
lyra-prompt-engine/
├── PROMPT.md          # 核心提示词（V6.0）
├── VISUAL.md          # 视觉生成协议（图片/视频场景模板、参考语法）
├── LICENSE            # MIT 协议
├── README.md          # 本文件
└── examples/         # 示例库
    ├── card-xiaoxiaodong01.md    # 高质感卡片提示词（苹果式克制）
    ├── card-youmind-hot-prompts.md # YouMind 热门视觉提示词模板
    ├── article-generation.md       # 文章生成示例
    ├── marketing-copy.md          # 营销文案示例
    └── app-json-output.md        # 结构化 JSON 输出示例
```

---

## 🤝 贡献

欢迎提交 Issue 和 PR：
- 🐛 发现 bug 或过时内容 → [提 Issue](https://github.com/95369149/lyra-prompt-engine/issues)
- 💡 新的编译模式或场景模板 → 提 PR
- 📝 分享你的使用案例 → 在 Issue 中分享

---

## 📄 License

[MIT](LICENSE) © 2026 Lyra Prompt Engine
