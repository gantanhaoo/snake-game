#!/usr/bin/env node

/**
 * Cloudflare Pages 完全自动化部署脚本
 * 尽可能自动化所有可自动化的步骤
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

console.log('\n🚀 Cloudflare Pages 完全自动化部署\n');
console.log('='.repeat(60));

// 颜色输出（如果支持）
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 步骤 1: 检查所有配置文件
log('\n📋 步骤 1: 检查配置文件...', 'blue');

const checks = {
  workflow: false,
  html: false,
  git: false,
  gitRemote: false
};

// 检查 workflow
try {
  const workflowPath = path.join(__dirname, '.github/workflows/cloudflare-deploy.yml');
  if (fs.existsSync(workflowPath)) {
    const content = fs.readFileSync(workflowPath, 'utf8');
    if (content.includes('cloudflare/pages-action')) {
      checks.workflow = true;
      log('✅ GitHub Actions workflow 配置正确', 'green');
    }
  }
} catch (error) {
  log('❌ Workflow 配置检查失败', 'red');
}

// 检查 HTML
if (fs.existsSync(path.join(__dirname, 'index.html'))) {
  checks.html = true;
  log('✅ index.html 文件存在', 'green');
}

// 检查 Git
try {
  execSync('git --version', { stdio: 'ignore' });
  checks.git = true;
  log('✅ Git 已安装', 'green');
} catch (error) {
  log('❌ Git 未安装', 'red');
}

// 检查 Git 远程仓库
try {
  const remotes = execSync('git remote -v', { encoding: 'utf8' });
  if (remotes.includes('github.com') || remotes.includes('gantanhaoo')) {
    checks.gitRemote = true;
    log('✅ Git 远程仓库已配置', 'green');
  }
} catch (error) {
  log('⚠️  无法检测 Git 远程仓库', 'yellow');
}

// 步骤 2: 打开 Cloudflare Dashboard
log('\n📋 步骤 2: 准备打开 Cloudflare Dashboard...', 'blue');

const platform = os.platform();
const cloudflareUrl = 'https://dash.cloudflare.com';
const pagesUrl = 'https://dash.cloudflare.com/?to=/:account/pages';

function openURL(url) {
  let command;
  switch (platform) {
    case 'darwin': // macOS
      command = `open "${url}"`;
      break;
    case 'win32': // Windows
      command = `start "" "${url}"`;
      break;
    default: // Linux
      command = `xdg-open "${url}"`;
      break;
  }
  
  try {
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

log('\n🌐 正在打开 Cloudflare Dashboard...', 'blue');
if (openURL(pagesUrl)) {
  log('✅ 已在浏览器中打开 Cloudflare Dashboard', 'green');
} else {
  log('⚠️  无法自动打开浏览器，请手动访问:', 'yellow');
  log(`   ${pagesUrl}`, 'yellow');
}

// 步骤 3: 显示详细的自动化部署指南
log('\n📋 步骤 3: 自动化部署指南\n', 'blue');
log('='.repeat(60), 'blue');

log('\n🎯 推荐方式：Cloudflare Dashboard 自动部署（最简单）\n', 'green');

console.log(`
在打开的 Cloudflare Dashboard 页面中，请按照以下步骤操作：

1️⃣  点击 "Create application" 或 "Create a project" 按钮
   
2️⃣  选择 "Pages" → "Connect to Git"

3️⃣  选择 GitHub 作为 Git 提供商
   - 如果是第一次，需要授权 Cloudflare 访问 GitHub
   - 选择你的账户
   - 勾选 "snake-game" 仓库
   - 点击 "Install & Authorize"

4️⃣  配置项目设置：
   ┌─────────────────────────────────────┐
   │ 项目名称: snake-game                │
   │ 生产分支: master                    │
   │ 框架预设: None (或 Static Site)     │
   │ 构建命令: (留空)                    │
   │ 输出目录: . (根目录，一个点)        │
   └─────────────────────────────────────┘

5️⃣  点击 "Save and Deploy" 按钮

6️⃣  等待部署完成（约 1-2 分钟）

7️⃣  部署完成后，你会看到部署链接：
    https://snake-game.pages.dev
`);

log('\n✨ 完成后的自动化：', 'green');
console.log(`
   ✅ 以后每次推送代码到 GitHub，Cloudflare Pages 会自动重新部署
   ✅ 无需任何手动操作
   ✅ 完全自动化！
`);

// 步骤 4: 提供 Git 命令（如果需要）
log('\n📋 步骤 4: Git 操作（如果需要推送代码）\n', 'blue');

try {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  if (status.trim()) {
    log('检测到未提交的更改，建议提交并推送：', 'yellow');
    console.log(`
    git add .
    git commit -m "配置 Cloudflare Pages 部署"
    git push origin master
    `);
  } else {
    log('✅ Git 工作区干净，无需提交', 'green');
  }
} catch (error) {
  log('⚠️  无法检查 Git 状态', 'yellow');
}

// 步骤 5: 检查清单
log('\n📋 检查清单\n', 'blue');
console.log(`
   □ 已在 Cloudflare Dashboard 中创建 Pages 项目
   □ 已连接 GitHub 仓库
   □ 已配置构建设置（项目名称、分支等）
   □ 已点击 "Save and Deploy"
   □ 部署成功
   □ 获得了部署链接（如：https://snake-game.pages.dev）
   □ 在浏览器中测试正常
   □ 在微信中测试正常
`);

// 步骤 6: 提供 GitHub Actions 方式的说明
log('\n📋 备选方式：GitHub Actions 自动部署\n', 'blue');
console.log(`
如果你想使用 GitHub Actions 方式（需要配置 Secrets），可以：

1. 获取 Cloudflare API Token:
   https://dash.cloudflare.com/profile/api-tokens
   
2. 获取 Account ID:
   在 Cloudflare Dashboard 右侧边栏找到 "Account ID"

3. 配置 GitHub Secrets:
   https://github.com/gantanhaoo/snake-game/settings/secrets/actions
   
   添加以下两个 Secrets:
   - CLOUDFLARE_API_TOKEN
   - CLOUDFLARE_ACCOUNT_ID

4. 推送代码触发部署
`);

log('\n' + '='.repeat(60), 'blue');
log('\n✨ 配置文件已就绪，按照上述步骤操作即可完成部署！\n', 'green');
log('💡 提示：Cloudflare Dashboard 方式最简单，推荐使用！\n', 'yellow');

