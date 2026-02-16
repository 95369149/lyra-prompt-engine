<![CDATA[<div align="center">

# 🔴 Lyra Prompt Engine

**自进化 AI 提示词编译引擎**

[![Version](https://img.shields.io/badge/version-V5.0-red?style=flat-square)](PROMPT.md)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Stars](https://img.shields.io/github/stars/95369149/lyra-prompt-engine?style=flat-square&color=yellow)](https://github.com/95369149/lyra-prompt-engine/stargazers)

不是模板库。是编译器。

将模糊需求 → 结构精确、可直接使用的 AI 提示词。
会学习，会迭代，会适配不同模型。

[快速开始](#-快速开始) · [核心特性](#-核心特性) · [对比](#-lyra-vs-其他方案) · [进化指令](#-进化指令) · [Changelog](#-changelog)

</div>

---

## 📖 目录

- [快速开始](#-快速开始)
- [核心特性](#-核心特性)
- [6 种编译模式](#-6-种编译模式)
- [视觉生成协议](#-视觉生成协议)
- [写作风格 Skill](#-写作风格-skill)
- [Lyra vs 其他方案](#-lyra-vs-其他方案)
- [进化指令](#-进化指令)
- [使用方法](#-使用方法)
- [Changelog](#-changelog)
- [贡献](#-贡献)

---

## ⚡ 快速开始

将 [`PROMPT.md`](PROMPT.md) 的完整内容复制到任意 AI 对话的 System Prompt 中，然后：

**写文案：**
```
[文本] 帮我写一封拒绝供应商涨价的商务邮件，语气坚定但不失礼貌
```

**生成视频提示词：**
```
[视觉] 一台工业机器人在智能工厂中精准焊接，赛博朋克风格，Seedance 2.0
```

**设计 Agent：**
```
[Agent] 设计一个客服机器人的系统提示词，处理退款和投诉，要有安全约束
```

Lyra 会自动识别模式，提问澄清需求，然后输出结构化的提示词。

---

## 🧬 核心特性

| 特性 | 说明 |
|:-----|:-----|
| 🎯 **6 种编译模式** | 文本 / 代码 / 分析 / 创意 / 视觉 / Agent，自动识别或手动指定 |
| 🧬 **三层进化** | 会话内学习 → 知识刷新 → 版本迭代，越用越准 |
| 🎨 **视觉生成协议** | 覆盖 MJ / DALL-E / Flux / Seedance / Kling / Sora，11 个场景模板 |
| ✍️ **写作风格 Skill** | 四步法让 AI 学会你的写作味道，~10 次迭代后比你自己更一致 |
| 🧠 **模型感知** | 自动适配 Claude / GPT / Gemini / 开源模型的最佳实践 |
| 🔴 **10 项质量红线** | 每次输出前静默自检，不含"尽量""适当"等模糊词 |

---

## 🎛 6 种编译模式

| 标签 | 用途 | 编译侧重 |
|:-----|:-----|:---------|
| `[文本]` | 文案、文章、邮件 | 语气、受众、结构、字数 |
| `[代码]` | 编程、调试、架构 | 技术栈、约束、错误处理 |
| `[分析]` | 数据分析、研究 | 推理链、证据、输出结构 |
| `[创意]` | 故事、广告、脑暴 | 风格锚定、情感、发散度 |
| `[视觉]` | 图片/视频提示词 | 视觉生成协议 |
| `[Agent]` | AI Agent 系统提示词 | 角色边界、工具调用、安全 |

---

## 🎨 视觉生成协议

核心原则：**写意图，不写细节。** 新一代模型有世界知识和导演思维。

**简单场景** — 一句话搞定：
```
生成一个精美高级的工业机器人广告，注意分镜编排
```

**11 个场景模板：**

| 场景 | 提示词模式 |
|:-----|:---------|
| 产品广告 | "生成一个[产品]广告，注意分镜编排" |
| 品牌宣传 | "生成一个讲述[品牌]的宣传片" |
| 换装展示 | "让@图片A的人换上@图片B的服装展示" |
| 照片→Vlog | "参考@视频1的运镜节奏，用图片变成Vlog" |
| 口播视频 | "使用@图片1人物+@音频1声音，生成视频播客" |
| 音频→MV | "为@音频1生成符合氛围的剧情，转场卡点" |
| 小说→动画 | 直接粘贴原文+"画风对齐@视频1风格" |
| ... | 详见 [PROMPT.md](PROMPT.md) |

---

## ✍️ 写作风格 Skill

> 去 AI 味的正确方向不是提示词，是让 AI 学会你的味道。

**四步法：**
1. 🍜 **尝菜** — 收集 3-5 篇你的原创文章
2. 🍳 **做菜** — AI 按初版 Skill 写一篇，你来改
3. 📝 **更新菜谱** — 对比原稿和修改版，提取规律
4. 🔄 **反复迭代** — 每篇文章都是迭代机会

---

## ⚔️ Lyra vs 其他方案

| 维度 | Lyra Engine | 静态模板库 | 手写 Prompt |
|:-----|:-----------|:----------|:-----------|
| **适配性** | 动态编译，按需生成 | 固定结构，复制粘贴 | 完全依赖经验 |
| **进化能力** | ✅ 三层自进化 | ❌ 无 | ❌ 无 |
| **模型感知** | ✅ 自动适配 | ❌ 通用模板 | ⚠️ 手动调整 |
| **视觉生成** | ✅ 11 场景协议 | ⚠️ 零散收集 | ❌ 无体系 |
| **风格学习** | ✅ Skill 迭代 | ❌ 无 | ❌ 无 |
| **质量保障** | ✅ 10 项红线自检 | ❌ 无 | ⚠️ 靠自觉 |
| **维护成本** | 低（自进化） | 高（手动更新） | 高（每次重写） |

---

## 🔮 进化指令

| 指令 | 功能 |
|:-----|:-----|
| `Lyra /evolve` | 基于会话反馈输出优化建议 |
| `Lyra /changelog` | 版本变更历史 |
| `Lyra /audit` | 全面自检，报告过时技术 |
| `Lyra /benchmark [模型]` | 针对指定模型输出适配建议 |
| `Lyra /style` | 触发写作风格 Skill 迭代 |

---

## 📦 使用方法

1. 复制 [`PROMPT.md`](PROMPT.md) 全文
2. 粘贴到任意 AI 对话的 System Prompt（或首条消息）
3. 输入需求，可选附带 `[模式标签]`
4. Lyra 自动编译，输出结构化提示词

支持：ChatGPT / Claude / Gemini / DeepSeek / 通义千问 / 任意 LLM

---

## 📋 Changelog

### V5.1 (2026-02-16)
- 新增 `[编排]` 模式：多模型 Orchestrator 协作
- 新增质检协议（7 分制）
- 模型感知更新：2026 免费模型矩阵

### V5.0 (2026-02-15)
- 新增"写意图不写细节"核心原则
- 新增视频生成 11 场景模板库
- 新增写作风格 Skill 协议（四步法 + 迭代机制）
- 新增 `/style` 进化指令
- 视觉生成协议重写

### V4.1 (2026-02-15)
- 新增三层进化协议
- 新增版本迭代触发条件

### V4.0 (2026-02-15)
- 从 V3.0 完全重写
- 新增模型感知、质量红线 checklist

<details>
<summary>更早版本</summary>

### V3.0
- 初始版本（4-D 协议、Seedance 专属协议）

</details>

---

## ⭐ Star History

<a href="https://star-history.com/#95369149/lyra-prompt-engine&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=95369149/lyra-prompt-engine&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=95369149/lyra-prompt-engine&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=95369149/lyra-prompt-engine&type=Date" />
 </picture>
</a>

---

## 🤝 贡献

欢迎提交 Issue 和 PR：

- 🐛 发现 bug 或过时内容 → [提 Issue](https://github.com/95369149/lyra-prompt-engine/issues)
- 💡 新的编译模式或场景模板 → 提 PR
- 📝 分享你的使用案例 → 在 Issue 中分享

---

## License

[MIT](LICENSE) © 2026 Lyra Prompt Engine
]]>