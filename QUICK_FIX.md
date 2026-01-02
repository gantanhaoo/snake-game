# 🚀 快速修复部署失败

## 问题
Cloudflare 错误地将项目识别为 Workers 项目，执行了 `npx wrangler deploy`，但这是静态网站。

## ✅ 解决方案（2步）

### 方法一：在 Cloudflare Dashboard 中修改（推荐）

1. **访问项目设置**
   - 打开：https://dash.cloudflare.com/b680f9dc31e95e4cb5b150fb94fa0705/pages/view/snake-game
   - 点击顶部 **"设置"** 标签

2. **找到构建设置**
   - 在设置页面中，找到 **"Builds & deployments"** 或 **"构建和部署"** 部分
   - 点击 **"Configure build"** 或 **"配置构建"**

3. **修改配置**
   - **框架预设**：选择 **"None"** 或 **"Static Site"**
   - **构建命令**：**完全清空**（删除 `npx wrangler deploy`）
   - **输出目录**：输入 **`.`**（一个点）

4. **保存并重试**
   - 点击 **"Save"**（保存）
   - 返回部署页面，点击 **"Retry Build"**（重试构建）

### 方法二：通过 GitHub 推送修复（如果方法一不行）

如果 Dashboard 中找不到构建设置，可以：

1. **删除当前项目**
   - 在 Cloudflare Pages 项目设置中删除 `snake-game` 项目

2. **重新创建项目**
   - 创建新 Pages 项目
   - **重要**：确保选择的是 **"Pages"**，不是 **"Workers"**
   - 连接 GitHub 仓库
   - 配置时：
     - 框架预设：**None**
     - 构建命令：**留空**
     - 输出目录：**.**

## 🎯 关键点

- ❌ **不要**使用 `npx wrangler deploy`（这是 Workers 命令）
- ✅ **构建命令必须留空**（静态网站不需要构建）
- ✅ **输出目录必须是 `.`**（根目录）

## 📝 验证

修复后，部署日志应该显示：
- ✅ 克隆仓库成功
- ✅ 检测到静态文件（index.html）
- ✅ 部署成功

部署完成后，你会获得链接：`https://snake-game.pages.dev`


