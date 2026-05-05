# Contributing to Lyra Prompt Engine

感谢你考虑为 Lyra Prompt Engine 做出贡献！以下是一些指南，帮助你参与项目。

## 如何贡献

### 报告 Bug 或问题
- 在 [Issues](https://github.com/95369149/lyra-prompt-engine/issues) 中提交问题
- 描述问题：预期行为 vs 实际行为
- 提供复现步骤（如果适用）
- 注明使用的 Lyra 版本和模型

### 提交新编译模式或场景模板
1. 在 `PROMPT.md` 的「任务模式」表格中添加新模式
2. 在 `VISUAL.md` 的场景模板库或 YouMind 风格模板库中补充
3. 在 `examples/` 目录中添加示例文件，命名规则：`模式-描述.md`（如 `card-product-launch.md`）
4. 更新 `README.md` 的目录和核心特性表

### 改进文档
- 修正错别字、语法错误
- 补充缺失的说明或示例
- 更新过时的模型信息或最佳实践

### 提交 Pull Request
1. Fork 仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 开发指南

### 项目结构
```
lyra-prompt-engine/
├── PROMPT.md          # 核心提示词（V6.0）
├── VISUAL.md          # 视觉生成协议
├── README.md          # 项目说明
├── CONTRIBUTING.md   # 本文件
├── LICENSE            # MIT 协议
└── examples/         # 示例库
    ├── card-xiaoxiaodong01.md    # 高质感卡片提示词
    ├── card-youmind-hot-prompts.md # YouMind 热门提示词
    ├── article-generation.md       # 文章生成示例
    ├── marketing-copy.md          # 营销文案示例
    └── app-json-output.md        # 结构化 JSON 输出示例
```

### 代码风格
- 提示词文件使用 Markdown 格式
- 示例文件命名使用小写字母和连字符（kebab-case）
- 保持内容简洁、结构清晰

## 社区准则
- 尊重他人，保持友好
- 接受建设性批评
- 关注项目目标：让提示词编译更精准、更易用

## 许可证
By contributing, you agree that your contributions will be licensed under the MIT License.
