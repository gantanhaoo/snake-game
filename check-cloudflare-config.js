#!/usr/bin/env node

/**
 * Cloudflare Pages 配置检查脚本
 * 验证部署配置是否正确
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

console.log('\n🔍 Cloudflare Pages 配置检查工具\n');
console.log('='.repeat(50));

// 检查本地配置
console.log('\n📋 1. 检查本地配置文件...\n');

const checks = {
  workflow: false,
  html: false,
  structure: false
};

// 检查 workflow 文件
try {
  const workflowPath = path.join(__dirname, '.github/workflows/cloudflare-deploy.yml');
  if (fs.existsSync(workflowPath)) {
    const content = fs.readFileSync(workflowPath, 'utf8');
    if (content.includes('cloudflare/pages-action') && 
        content.includes('CLOUDFLARE_API_TOKEN') &&
        content.includes('CLOUDFLARE_ACCOUNT_ID')) {
      checks.workflow = true;
      console.log('✅ GitHub Actions workflow 配置正确');
    } else {
      console.log('❌ GitHub Actions workflow 配置不完整');
    }
  } else {
    console.log('❌ 未找到 workflow 文件');
  }
} catch (error) {
  console.log('❌ 读取 workflow 文件时出错:', error.message);
}

// 检查 HTML 文件
try {
  const htmlPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(htmlPath)) {
    checks.html = true;
    console.log('✅ index.html 文件存在');
  } else {
    console.log('❌ 未找到 index.html 文件');
  }
} catch (error) {
  console.log('❌ 检查 HTML 文件时出错:', error.message);
}

// 检查目录结构
try {
  const githubDir = path.join(__dirname, '.github', 'workflows');
  if (fs.existsSync(githubDir)) {
    checks.structure = true;
    console.log('✅ GitHub Actions 目录结构正确');
  } else {
    console.log('❌ GitHub Actions 目录不存在');
  }
} catch (error) {
  console.log('❌ 检查目录结构时出错:', error.message);
}

// 总结
console.log('\n' + '='.repeat(50));
const allPassed = Object.values(checks).every(v => v === true);

if (allPassed) {
  console.log('\n✅ 本地配置检查通过！所有文件配置正确。\n');
  console.log('📝 下一步:');
  console.log('   1. 按照 CLOUDFLARE_PAGES_SETUP.md 中的步骤配置 Cloudflare');
  console.log('   2. 推送代码到 GitHub');
  console.log('   3. 在 Cloudflare Dashboard 中查看部署状态\n');
} else {
  console.log('\n❌ 配置检查未完全通过，请检查上述错误。\n');
  process.exit(1);
}

