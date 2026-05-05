# Lyra 视觉生成协议 V6.0

> 当 `[视觉]` 或 `[卡片]` 标签触发时加载本协议。独立于主引擎进化，跟随视觉模型更新节奏。

## 核心原则

**写意图，不写细节。** 新一代视频/图像模型有世界知识和导演思维，不需要你写百科全书。

## 图片生成

根据目标模型选择策略：

### 通用结构（Midjourney/DALL-E/Seedream）
- 英文输出
- 结构：Subject + Environment + Style + Lighting + Camera + Details
- 60-150 词
- 有参考图时以 "Based on the reference image, ..." 开头

### FLUX.2（Black Forest Labs）
- 支持最长 32K tokens 提示词，可写极其详细的描述
- 多参考图（最多 8 张）：角色一致性、产品展示、风格迁移
- 4MP 分辨率，任意宽高比
- 擅长：手部/面部细节、材质渲染、文字排版、品牌色（hex 色值精确匹配）
- 提示词：100-300 词

### Recraft V4（设计品味优先）
- 原生 SVG 矢量输出，可直接在 Figma/Illustrator 编辑
- 文字排版作为构图一等元素，与场景融合而非叠加
- 四个变体：V4（标准光栅）、V4 Pro（高分辨率）、V4 SVG、V4 Pro SVG
- 适合：编辑设计、商业产品摄影、品牌资产、图标集、海报
- 提示词侧重：构图意图、排版层次、材质物理、色彩关系
- 提示词：100-500 词

### Gemini 原生图片生成（Nano Banana Pro / Gemini 3 Pro Image）
- 自回归架构，理解文本语义而非仅空间信息
- 最强文字渲染准确度，逐字精确
- 可处理逻辑推理任务（解题、信息图表生成、代码渲染）
- 适合：信息可视化、教育内容、含大量文字的设计
- 提示词可包含需要渲染的完整文本内容
- 提示词：60-200 词 + 可附带需渲染的原始文本

### 图片模型选择建议

| 需求 | 推荐模型 |
|------|----------|
| 通用高质量 + 多参考图 | FLUX.2 pro/flex |
| 设计/品牌/排版/SVG | Recraft V4 |
| 文字精确渲染/信息图 | Gemini Image |
| 快速原型/开源 | FLUX.2 dev |
| 艺术风格/社区生态 | Midjourney |

## 视频生成

### 通用原则

**简单场景（模型有常识的领域）：**
- 一句话搞定："生成一个精美高级的[主题]广告，注意分镜编排"
- 不要自己编分镜，交给模型

**复杂场景（需要精确控制）：**
- 结构：Subject + Action + Camera Movement + Scene + Style + Physics/Audio
- 50-120 词
- 超过 5 秒的复杂动作分镜：`Shot 1: ... | Cut to Shot 2: ...`

### 模型特性

**Veo 3 / Veo 3.1（Google）**
- Veo 3：支持原生音频生成（对话、环境音、音效），8 秒，720p/1080p
- Veo 3.1 新增：参考图（最多 3 张）保持角色/产品一致性；首尾帧控制
- 提示词要素：镜头构图、焦点效果、整体风格、机位运动

**Seedance 1 Pro/Lite + 2.0（ByteDance）**
- 2.0：写意图不写细节，支持参考素材语法
- 1 Pro（高质量）和 1 Lite（快速/低成本），480p-1080p，5-10 秒

**Kling 2.0/2.1（快手）**
- 2.1 Master 最高质量，2.1 标准版性价比高
- 720p-1080p，5-10 秒

**Wan 2.2（阿里巴巴，开源）**
- 超低成本（$0.05/视频），快速生成（~30 秒）
- 480p-720p，5 秒，适合快速原型和批量测试

**Gen-4 Turbo（Runway）**
- 720p，5-10 秒，极快生成（22-32 秒）

**Sora（OpenAI）**
- 扩散模型 + Transformer 架构

### 视频模型选择建议

| 需求 | 推荐模型 |
|------|----------|
| 最高质量 + 原生音频 | Veo 3 |
| 角色一致性 + 参考图 + 首尾帧 | Veo 3.1 |
| 写意图不写细节 + 参考素材 | Seedance 2.0 |
| 性价比 + 高质量 | Seedance 1 Pro |
| 快速原型/批量测试 | Wan 2.2 Fast |
| 最快生成速度 | Gen-4 Turbo |

## 参考素材语法（Seedance 2.0）

- 完全保留：`@图片1` / `@视频1` / `@音频1`
- 提取元素："面部非常像@视频1角色"、"动作与@视频1一致"
- 风格参考："画风严格对齐@视频1的风格"
- 情绪调整："表现得更激动一些"（模型能修改素材情绪）

## V6.0 新增：YouMind 风格模板库

| 风格 | 提示词模式 | 关键参数 |
|------|-----------|---------|
| 蜡笔插画 | "Rework into crayon-style illustration, bright playful colors, childlike imagination" | `{argument name="age" default="10-year-old"}` |
| 产品启发服装 | "Using this product as inspiration, design a set of {style} clothing" | `{argument name="style" default="cool-style"}` |
| 便利店抓拍 | "Candid moment, smartphone pov, shallow depth of field, natural skin tones" | `{argument name="nationality" default="Indonesian"}` `{argument name="action" default="smiling gently"}` |
| 2D转3D户型 | "Convert 2D floor plan to photorealistic 3D render, preserve labels, bright catalog-style" | `{argument name="perspective" default="isometric"}` |
| 赛博朋克工业 | "Cyberpunk industrial robot welding in smart factory, neon lighting, cinematic" | `{argument name="camera" default="tracking shot"}` |

## 场景模板库（V6.0 扩充）

| 场景 | 提示词模式 | 关键技巧 |
|------|-----------|---------|
| 产品广告 | "生成一个[产品]广告，注意分镜编排" | 写意图不写细节 |
| 品牌宣传 | "生成一个讲述[品牌]的宣传片" | 模型自带品牌知识 |
| 教学视频 | "生成一个[动作/技能]的讲解视频" | 模型知道正确姿势 |
| 换装展示 | "让@图片A的人换上@图片B的服装展示，不同景别运镜转场" | 多图混搭 |
| 户型→参观 | 先用图像模型生成九宫格分镜，再"参考分镜和户型图生成沉浸式参观视频" | 两步走 |
| 照片→Vlog | "参考@视频1的运镜节奏风格，用图片变成Vlog" | 必须描述参考视频特色 |
| 口播视频 | "使用@图片1人物+@音频1声音，生成视频播客，加字幕" | 可调情绪 |
| 音频→MV | "为@音频1生成符合氛围的[情绪]剧情，保持作为BGM，转场卡点" | 纯白图片绕过音频限制 |
| 动作迁移 | "面部像@视频1角色的[角色]在[场景][动作]，动作运镜与@视频1一致" | 静止镜头加 LOCKED-ON SHOT |
| 小说→动画 | 直接粘贴原文+"画风对齐@视频1风格" | 续拍："延长15s，内容为：[后续文本]" |
| UI→宣传片 | 先图像模型加质感，再"生成Fluent UI风格动效视频" | 单张抽卡效果优于多张 |
| 工业设备 | "生成[设备型号]在[场景]中运行的展示视频，强调精度和效率" | B2B 场景，突出参数和应用 |
| 高质感卡片/海报 | "生成一张[推荐对象]的高质感推荐卡片，苹果式克制，3秒读懂" | 视觉DNA提取、信息少而准、槽位化参数 |

## 避坑清单

- 有常识的领域不写细节
- 参考视频风格时必须描述核心特色
- 人物相对镜头静止时加：`CAMERA MOUNTED ON [角色], LOCKED-ON SHOT, FIXED-TO-ACTOR`
- logo/文字受分辨率限制可能不准
- 真人主体参考需本人验证或授权
- V6.0 新增：卡片/海报模式必须保证手机端可读性，信息少而准，文字大且清楚，留白有呼吸感

## 质量自检（V6.0 扩充）

- [ ] 是否遵循"写意图不写细节"原则？
- [ ] 简单场景是否用了一句话而非长篇描述？
- [ ] 参考素材语法是否正确（`@图片`/`@视频`/`@音频`）？
- [ ] 复杂场景是否控制在 50-120 词？
- [ ] 是否有不必要的百科式描述可以删除？
- [ ] **卡片/海报专项**：是否提取了推荐对象的视觉 DNA？
- [ ] **卡片/海报专项**：是否做到信息少而准、文字大且清楚？
- [ ] **卡片/海报专项**：是否保证手机端 3 秒读懂（是什么、为什么值得、适合谁）？
- [ ] **卡片/海报专项**：是否使用了槽位化参数（`{argument name="xxx" default="yyy"}`）？

## Changelog

### V6.0 (2026-05-05)
- 新增 YouMind 风格模板库（蜡笔插画/产品启发/便利店抓拍/2D转3D）
- 新增参数化语法：`{argument name="xxx" default="yyy"}`，支持可复用槽位
- 场景模板库扩充至 14 个（新增工业设备、高质感卡片/海报）
- 质量自检扩充：新增卡片/海报专项检查项
- 避坑清单更新：新增卡片/海报模式注意事项
- 图片生成补充：FLUX.2 32K tokens、Recraft V4 SVG、Gemini 文字渲染准确度

### V1.1 (2026-02-23)
- 图片生成：新增 FLUX.2、Recraft V4、Gemini 原生图片生成
- 视频生成：新增 Veo 3/3.1、Kling 2.0/2.1、Seedance 1 Pro/Lite、Wan 2.2、Hailuo 02、Gen-4 Turbo
- 模型选择建议表分层清晰化

### V1.0 (2026-02-17)
- 从 PROMPT.md V5.2 独立拆出
- 新增工业设备场景模板
- 新增独立质量自检清单
