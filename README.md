# AI-fm
## 项目介绍
这个项目是我受到 OpenAI TTS 演示网站 的启发后复刻的一个站点。非常喜欢 OpenAI 新推出的 TTS 演示 UI 设计，因此决定动手实现一个类似的交互体验，并在此基础上加入了一些自己修改。

## 功能特性
- TTS 引擎: 使用了 Cosyvoice2 作为语音合成引擎，在原有 7 个声音的基础上新增了几种语音选项。
- 情感支持: 支持情感选择，用户可以根据需求调整语音的情感表达。
- UI 交互: 保留了原网站的优秀交互设计，并进行了优化。
- 字体: 使用了 Maple Mono 字体，感谢作者提供了如此出色的开源字体。

## 技术栈
- 框架: Next.js

## 安装与运行
### 克隆仓库：
```bash
git clone https://github.com/loo-y/ai-fm.git
```
### 安装依赖：
```bash
npm install
```

### 运行项目：
```bash
npm run dev
```
在浏览器中访问 http://localhost:3000。
