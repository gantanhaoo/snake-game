# 自定义域名配置指南

## 前提条件

1. 拥有一个自定义域名（如：example.com 或 game.example.com）
2. 域名可以配置 DNS 解析

## 配置步骤

### 步骤 1：创建 CNAME 文件

在项目根目录创建 `CNAME` 文件，内容为你的域名（不包含 http:// 或 https://）

例如：
```
snake.yourdomain.com
```

### 步骤 2：配置 DNS 解析

在你的域名服务商（如阿里云、腾讯云、GoDaddy等）配置 DNS 记录：

**CNAME 记录：**
- 主机记录：`snake`（或 `@` 表示根域名）
- 记录类型：`CNAME`
- 记录值：`gantanhaoo.github.io`
- TTL：600（或默认值）

**或者 A 记录：**
- 主机记录：`snake`（或 `@` 表示根域名）
- 记录类型：`A`
- 记录值：`185.199.108.153`、`185.199.109.153`、`185.199.110.153`、`185.199.111.153`
- TTL：600（或默认值）

### 步骤 3：在 GitHub 中配置

1. 登录 GitHub，进入仓库 `gantanhaoo/snake-game`
2. 点击 `Settings` → `Pages`
3. 在 `Custom domain` 输入框中输入你的域名
4. 勾选 `Enforce HTTPS`（推荐）
5. 点击 `Save`

### 步骤 4：等待 DNS 生效

DNS 解析通常需要几分钟到几小时生效，可以使用以下命令检查：

```bash
# 检查 CNAME 记录
nslookup snake.yourdomain.com

# 或使用 dig 命令
dig snake.yourdomain.com
```

### 步骤 5：更新代码中的 URL

更新 `index.html` 中所有 `gantanhaoo.github.io` 的引用为你的自定义域名。

## 注意事项

1. **HTTPS 证书**：GitHub Pages 会自动为自定义域名配置 SSL 证书，可能需要几分钟到几小时
2. **DNS 传播**：DNS 更改可能需要 24-48 小时才能在全球生效
3. **CNAME 文件**：必须放在仓库根目录
4. **根域名**：如果使用根域名（如 example.com），需要配置 A 记录而不是 CNAME

## 验证配置

配置完成后，访问你的自定义域名，应该能看到游戏页面。

## 常见问题

**Q: 为什么访问自定义域名显示 404？**
A: 检查 CNAME 文件是否正确，DNS 是否已生效，GitHub Pages 设置是否正确。

**Q: HTTPS 证书未生效？**
A: 等待几分钟到几小时，GitHub 会自动配置 SSL 证书。

**Q: DNS 解析失败？**
A: 检查 DNS 记录是否正确，等待 DNS 传播完成。

