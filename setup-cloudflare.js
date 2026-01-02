#!/usr/bin/env node

/**
 * Cloudflare Pages 自动化部署设置脚本
 * 帮助用户快速完成 Cloudflare Pages 部署配置
 */

const fs = require('fs');
const path = require('path');

console.log('\n🚀 Cloudflare Pages 自动化部署设置\n');
console.log('=' .repeat(50));

// 检查必要的文件
console.log('\n📋 步骤 1: 检查配置文件...\n');

const requiredFiles = [
  '.github/workflows/cloudflare-deploy.yml',
  'index.html'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

if (!allFilesExist) {
  console.log('\n❌ 缺少必要的配置文件！');
  process.exit(1);
}

console.log('\n✅ 所有配置文件检查通过！');

// 检查 GitHub Actions workflow
console.log('\n📋 步骤 2: 验证 GitHub Actions 配置...\n');

try {
  const workflowPath = path.join(__dirname, '.github/workflows/cloudflare-deploy.yml');
  const workflowContent = fs.readFileSync(workflowPath, 'utf8');
  
  const checks = [
    { name: 'Workflow 文件存在', condition: workflowContent.length > 0 },
    { name: '包含 Cloudflare Pages action', condition: workflowContent.includes('cloudflare/pages-action') },
    { name: '包含 API Token 配置', condition: workflowContent.includes('CLOUDFLARE_API_TOKEN') },
    { name: '包含 Account ID 配置', condition: workflowContent.includes('CLOUDFLARE_ACCOUNT_ID') },
    { name: '支持 master 分支', condition: workflowContent.includes('branches: [master') || workflowContent.includes('branches: [ master') },
  ];

  checks.forEach(check => {
    console.log(`${check.condition ? '✅' : '❌'} ${check.name}`);
  });

  console.log('\n✅ GitHub Actions 配置验证通过！');
} catch (error) {
  console.log('\n❌ 验证配置文件时出错:', error.message);
  process.exit(1);
}

// 显示下一步指引
console.log('\n' + '='.repeat(50));
console.log('\n📝 下一步操作指南:\n');

console.log('🔑 方式一：通过 Cloudflare Dashboard（推荐，最简单）\n');
console.log('1. 访问: https://dash.cloudflare.com');
console.log('2. 点击 "Workers & Pages" → "Create application" → "Pages"');
console.log('3. 选择 "Connect to Git" → 选择 GitHub');
console.log('4. 选择仓库: gantanhaoo/snake-game');
console.log('5. 配置设置:');
console.log('   - 项目名称: snake-game');
console.log('   - 生产分支: master');
console.log('   - 构建命令: (留空)');
console.log('   - 输出目录: . (根目录)');
console.log('6. 点击 "Save and Deploy"\n');

console.log('⚙️  方式二：通过 GitHub Actions（需要配置 Secrets）\n');
console.log('1. 获取 Cloudflare API Token:');
console.log('   https://dash.cloudflare.com/profile/api-tokens');
console.log('   → Create Token → 选择 "Edit Cloudflare Workers" 模板\n');
console.log('2. 获取 Account ID:');
console.log('   https://dash.cloudflare.com');
console.log('   → 在右侧边栏找到 "Account ID"\n');
console.log('3. 配置 GitHub Secrets:');
console.log('   https://github.com/gantanhaoo/snake-game/settings/secrets/actions');
console.log('   → New repository secret');
console.log('   → 添加 CLOUDFLARE_API_TOKEN 和 CLOUDFLARE_ACCOUNT_ID\n');
console.log('4. 推送代码或手动触发 GitHub Actions\n');

console.log('='.repeat(50));
console.log('\n✨ 配置文件已就绪！');
console.log('📖 详细文档请查看: CLOUDFLARE_PAGES_SETUP.md\n');

