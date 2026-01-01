# 注册域名步骤指南

## 🎯 已为你选择的域名

**域名**: `snakegame2024.tk`

这个域名已经配置到你的项目中，你只需要去注册它即可！

---

## 📝 注册步骤（Freenom 免费域名）

### 步骤 1：访问 Freenom

1. 打开浏览器，访问：https://www.freenom.com
   - ⚠️ 注意：可能需要使用 VPN（选择美国节点）才能正常访问

2. 如果无法访问，可以尝试：
   - 使用 VPN 切换到美国 IP
   - 或使用其他免费域名服务

### 步骤 2：搜索并选择域名

1. 在搜索框输入：`snakegame2024`
2. 点击"检查可用性"或"Get it now"
3. 如果 `snakegame2024.tk` 不可用，可以尝试：
   - `snakegame2024.ml`
   - `snakegame2024.ga`
   - `snakegame2024.cf`
   - `snakegame2024.gq`

4. 选择可用的域名，点击"Get it now!"或"添加到购物车"

### 步骤 3：选择注册期限

1. 选择注册期限（建议选择 12 个月，免费）
2. 点击"Continue"或"继续"

### 步骤 4：创建账户

1. 如果还没有账户，点击"Create Account"或"创建账户"
2. 填写注册信息：
   - 邮箱地址（必须真实，用于验证）
   - 密码
   - 姓名
   - 地址等信息
3. 完成邮箱验证

### 步骤 5：完成注册

1. 登录账户
2. 完成域名注册流程
3. 域名注册成功后，进入"我的域名"管理页面

---

## ⚙️ 配置 DNS 解析

注册成功后，需要配置 DNS 指向 GitHub Pages：

### 在 Freenom 中配置：

1. 登录 Freenom，进入"我的域名"（My Domains）
2. 找到 `snakegame2024.tk`，点击"管理域名"（Manage Domain）
3. 进入"管理 Freenom DNS"（Manage Freenom DNS）
4. 添加以下 DNS 记录：

**CNAME 记录**（推荐）：
- **名称**：`@`（表示根域名）或留空
- **类型**：`CNAME`
- **目标**：`gantanhaoo.github.io`
- **TTL**：3600

**或者 A 记录**（如果 CNAME 不支持根域名）：
添加 4 条 A 记录：
- 名称：`@`，类型：`A`，目标：`185.199.108.153`
- 名称：`@`，类型：`A`，目标：`185.199.109.153`
- 名称：`@`，类型：`A`，目标：`185.199.110.153`
- 名称：`@`，类型：`A`，目标：`185.199.111.153`

5. 保存更改

---

## 🔧 在 GitHub 中配置

1. 登录 GitHub，进入仓库 `gantanhaoo/snake-game`
2. 点击 `Settings`（设置）
3. 在左侧菜单找到 `Pages`
4. 在 `Custom domain`（自定义域名）输入框中输入：`snakegame2024.tk`
5. 勾选 `Enforce HTTPS`（强制 HTTPS）
6. 点击 `Save`（保存）

---

## 📤 提交并部署代码

配置完成后，提交代码：

```bash
git add .
git commit -m "Configure custom domain: snakegame2024.tk"
git push origin master
```

---

## ⏱️ 等待生效

1. **DNS 传播**：通常需要 5 分钟到 2 小时
   - 可以使用以下命令检查：
     ```bash
     nslookup snakegame2024.tk
     ```

2. **HTTPS 证书**：GitHub 会自动配置，通常需要 10 分钟到几小时
   - 可以在 GitHub Pages 设置中查看状态

---

## ✅ 验证配置

配置完成后，访问 `https://snakegame2024.tk` 应该能看到游戏页面。

在微信中打开链接，应该能直接访问（不会被拦截）！

---

## 🆘 如果域名不可用

如果 `snakegame2024.tk` 已被注册，可以：

1. **尝试其他后缀**：
   - `snakegame2024.ml`
   - `snakegame2024.ga`
   - `snakegame2024.cf`

2. **修改域名名称**：
   - `mysnakegame.tk`
   - `snake2024game.tk`
   - `snakegame2025.tk`

3. **注册后更新配置**：
   ```bash
   node quick-setup.js your-new-domain.tk
   ```

---

## 📌 重要提醒

1. **免费域名限制**：
   - 需要每年续期（免费）
   - 部分服务可能不稳定
   - 可能被某些服务限制

2. **推荐方案**：
   - 如果长期使用，建议购买一个便宜的 `.xyz` 域名（约 ¥1-10/年）
   - 更稳定可靠

3. **DNS 配置**：
   - 确保 DNS 记录正确配置
   - 等待 DNS 传播完成

---

## 🎉 完成！

按照以上步骤操作后，你的游戏就可以通过 `https://snakegame2024.tk` 访问了！

在微信中打开这个链接，应该能直接访问，不会被拦截！

