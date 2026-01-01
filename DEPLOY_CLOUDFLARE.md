# 🚀 使用 Cloudflare Pages 自动部署（最简单方案）

## ✅ 优势

- ✅ **完全免费**
- ✅ **全球 CDN（Cloudflare 网络）**
- ✅ **自动 HTTPS**
- ✅ **不会被微信拦截**
- ✅ **GitHub Actions 自动部署**

---

## 📝 快速部署步骤（2 步）

### 步骤 1：获取 Cloudflare API Token（2 分钟）

1. 访问：https://dash.cloudflare.com/profile/api-tokens
2. 点击 **"Create Token"**
3. 选择 **"Edit Cloudflare Workers"** 模板
4. 或者自定义权限：
   - **Account** → **Cloudflare Pages** → **Edit**
5. 点击 **"Continue to summary"** → **"Create Token"**
6. **复制生成的 token**（只显示一次，请保存好）

### 步骤 2：获取 Account ID（1 分钟）

1. 访问：https://dash.cloudflare.com
2. 在右侧边栏找到 **"Account ID"**
3. **复制 Account ID**

### 步骤 3：配置 GitHub Secrets（1 分钟）

1. 访问：https://github.com/gantanhaoo/snake-game/settings/secrets/actions
2. 点击 **"New repository secret"**
3. 添加以下两个 secrets：

   **Secret 1:**
   - Name: `CLOUDFLARE_API_TOKEN`
   - Value: 粘贴你刚才复制的 API Token
   - 点击 **"Add secret"**

   **Secret 2:**
   - Name: `CLOUDFLARE_ACCOUNT_ID`
   - Value: 粘贴你的 Account ID
   - 点击 **"Add secret"**

### 步骤 4：触发部署

1. 我已经创建了配置文件
2. 推送代码到 GitHub
3. GitHub Actions 会自动运行
4. 部署完成后，你会获得：`snake-game.pages.dev`

---

## 🎯 获取部署链接

部署完成后：

1. 访问：https://dash.cloudflare.com
2. 进入 **"Workers & Pages"** → **"Pages"**
3. 找到 `snake-game` 项目
4. 你会看到部署链接：`https://snake-game.pages.dev`
5. **在微信中打开这个链接即可！**

---

## 🔄 自动部署

配置完成后，每次推送代码到 GitHub，Cloudflare Pages 会自动：
- 检测代码变更
- 自动重新部署
- 更新网站内容

---

## 🆘 遇到问题？

### 问题 1：没有 Cloudflare 账户
- **解决**：访问 https://dash.cloudflare.com/sign-up 免费注册

### 问题 2：部署失败
- **解决**：检查 GitHub Secrets 是否正确配置
- 查看 GitHub Actions 日志

### 问题 3：Token 权限不足
- **解决**：确保 Token 有 Cloudflare Pages 的编辑权限

---

## ✅ 完成检查清单

- [ ] 注册了 Cloudflare 账户
- [ ] 获取了 API Token
- [ ] 获取了 Account ID
- [ ] 配置了 GitHub Secrets
- [ ] 代码已推送到 GitHub
- [ ] 部署成功
- [ ] 在微信中测试正常

---

## 🎉 完成！

部署完成后，告诉我你的 Cloudflare Pages 域名，我可以帮你：
1. 测试是否能在微信中正常打开
2. 优化配置
3. 设置自定义域名（可选）

**现在就开始部署吧！** 🚀

