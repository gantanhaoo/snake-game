# Vercel 快速部署指南

## 🌐 方法一：浏览器部署（推荐，最简单）

### 步骤：
1. 访问：https://vercel.com/new
2. 找到你的 `snake-game` 仓库
3. 点击 "Import" 按钮
4. 配置页面：
   - **Framework Preset**: 选择 "Other" 或保持默认
   - **Root Directory**: 留空（根目录）
   - **Build Command**: 留空
   - **Output Directory**: 留空
5. 点击 "Deploy"
6. 等待1-2分钟完成部署
7. 部署完成后会自动获得免费域名：`https://snake-game-xxx.vercel.app`

## 🖥️ 方法二：命令行部署

### 首次使用需要登录：
```bash
vercel login
```

### 然后运行自动部署脚本：
```bash
node deploy-vercel-auto.js
```

或者直接使用 CLI：
```bash
vercel --yes --prod
```

## ✅ 部署后的免费域名

- **自动获得**：部署成功后，Vercel 会自动分配一个免费域名
- **格式**：`https://your-project-name-xxx.vercel.app`
- **永久免费**：Vercel 的免费域名永久有效
- **HTTPS**：自动配置 SSL 证书

## 📝 注意事项

- Vercel 免费域名格式为：`.vercel.app`
- 每个项目都会自动获得一个免费域名
- 如果需要自定义域名，可以在项目设置中添加（需要有自己的域名）
- 所有部署都是自动的，无需手动配置

