# 获取免费域名指南

## 方案 1：使用 Freenom 免费域名（推荐）

### 步骤 1：注册免费域名

1. **访问 Freenom**：
   - 网址：https://www.freenom.com
   - 注意：可能需要使用 VPN（美国 IP）才能访问

2. **搜索域名**：
   - 在搜索框输入你想要的域名（例如：`snakegame`）
   - 点击"检查可用性"

3. **选择域名**：
   - 选择可用的免费后缀（`.tk`、`.ml`、`.ga`、`.cf`、`.gq`）
   - 例如：`snakegame.tk` 或 `snakegame.ml`

4. **完成注册**：
   - 选择注册期限（建议 12 个月）
   - 创建账户并完成注册
   - 注意：免费域名需要每年续期

### 步骤 2：配置 DNS

1. 登录 Freenom，进入"我的域名"
2. 选择你的域名，点击"管理域名"
3. 进入"管理 Freenom DNS"
4. 添加以下记录：

**CNAME 记录**（推荐）：
- 名称：`snake`（或 `www`）
- 类型：`CNAME`
- 目标：`gantanhaoo.github.io`
- TTL：3600

**或 A 记录**（用于根域名）：
- 名称：`@`
- 类型：`A`
- 目标：`185.199.108.153`
- 再添加三条相同记录，目标分别为：
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

### 步骤 3：在 GitHub 配置

1. 登录 GitHub，进入仓库 `gantanhaoo/snake-game`
2. 点击 `Settings` → `Pages`
3. 在 `Custom domain` 输入你的域名（如：`snake.snakegame.tk`）
4. 勾选 `Enforce HTTPS`
5. 点击 `Save`

---

## 方案 2：购买便宜域名

### 推荐的域名注册商：

1. **Namecheap**：
   - `.xyz` 域名约 $1-2/年
   - 网址：https://www.namecheap.com

2. **阿里云**：
   - `.xyz` 域名约 ¥1-10/年
   - 网址：https://wanwang.aliyun.com

3. **腾讯云**：
   - `.xyz` 域名约 ¥1-10/年
   - 网址：https://dnspod.cloud.tencent.com

### 购买后配置：

1. 在域名服务商配置 DNS（同上）
2. 在 GitHub Pages 配置自定义域名

---

## 方案 3：使用 GitHub Pages 子域名（临时测试）

如果你只是想测试，可以：
1. 使用 GitHub Pages 提供的默认域名：`gantanhaoo.github.io/snake-game`
2. 但这仍然可能被微信拦截

---

## 快速配置脚本

获取域名后，运行以下命令快速配置：

```bash
# 使用配置脚本（需要先有域名）
node update-domain.js your-domain.com

# 或手动配置
# 1. 编辑 CNAME 文件，输入你的域名
# 2. 编辑 index.html，替换所有 yourdomain.com 为你的真实域名
```

---

## 注意事项

1. **免费域名的限制**：
   - Freenom 免费域名可能需要每年续期
   - 部分免费域名服务不稳定
   - 可能被某些服务（如微信）限制

2. **DNS 传播时间**：
   - 通常需要几分钟到几小时
   - 最长可能需要 24-48 小时

3. **HTTPS 证书**：
   - GitHub 会自动配置 SSL 证书
   - 可能需要几分钟到几小时生效

---

## 推荐方案

**最佳选择**：购买一个便宜的 `.xyz` 域名（约 ¥1-10/年）
- 稳定可靠
- 不会被微信拦截
- 长期使用成本低

**快速测试**：使用 Freenom 免费域名
- 免费
- 适合短期测试
- 需要每年续期

