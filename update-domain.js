#!/usr/bin/env node
/**
 * 更新自定义域名的脚本
 * 使用方法: node update-domain.js yourdomain.com
 */

const fs = require('fs');
const path = require('path');

// 获取命令行参数
const newDomain = process.argv[2];

if (!newDomain) {
    console.error('错误: 请提供域名');
    console.log('使用方法: node update-domain.js yourdomain.com');
    process.exit(1);
}

// 移除协议前缀
const cleanDomain = newDomain.replace(/^https?:\/\//, '').replace(/\/$/, '');
const oldDomain = 'gantanhaoo.github.io/snake-game';

console.log(`正在更新域名为: ${cleanDomain}`);

// 读取 index.html
const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 替换所有旧域名为新域名
const replacements = [
    // 完整 URL 替换
    { old: `https://${oldDomain}`, new: `https://${cleanDomain}` },
    { old: `http://${oldDomain}`, new: `https://${cleanDomain}` },
    // 仅域名替换
    { old: oldDomain, new: cleanDomain },
];

let changed = false;
replacements.forEach(({ old, new: newVal }) => {
    if (content.includes(old)) {
        content = content.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newVal);
        changed = true;
    }
});

if (changed) {
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log('✓ index.html 已更新');
} else {
    console.log('⚠ 未找到需要替换的域名');
}

// 创建或更新 CNAME 文件
const cnamePath = path.join(__dirname, 'CNAME');
fs.writeFileSync(cnamePath, cleanDomain, 'utf8');
console.log(`✓ CNAME 文件已创建: ${cleanDomain}`);

console.log('\n下一步:');
console.log('1. 配置 DNS 解析（CNAME 指向 gantanhaoo.github.io）');
console.log('2. 在 GitHub Pages 设置中添加自定义域名');
console.log('3. 提交并推送代码: git add . && git commit -m "Add custom domain" && git push');

