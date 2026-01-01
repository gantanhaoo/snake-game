#!/usr/bin/env node
/**
 * 快速配置自定义域名脚本
 * 使用方法: node quick-setup.js your-domain.com
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function updateDomain(domain) {
    // 清理域名
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    const oldDomain = 'snake.yourdomain.com';
    
    console.log(`\n正在配置域名: ${cleanDomain}\n`);
    
    // 更新 CNAME 文件
    const cnamePath = path.join(__dirname, 'CNAME');
    fs.writeFileSync(cnamePath, cleanDomain, 'utf8');
    console.log(`✓ CNAME 文件已更新: ${cleanDomain}`);
    
    // 更新 index.html
    const indexPath = path.join(__dirname, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // 替换所有旧域名为新域名
    const replacements = [
        { old: oldDomain, new: cleanDomain },
        { old: 'snake.yourdomain.com', new: cleanDomain },
    ];
    
    let changed = false;
    replacements.forEach(({ old, new: newVal }) => {
        const regex = new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        if (content.includes(old)) {
            content = content.replace(regex, newVal);
            changed = true;
        }
    });
    
    if (changed) {
        fs.writeFileSync(indexPath, content, 'utf8');
        console.log(`✓ index.html 已更新`);
    }
    
    console.log(`\n✅ 配置完成！\n`);
    console.log('下一步操作：');
    console.log('1. 配置 DNS 解析：');
    console.log(`   - 主机记录：snake（或 @）`);
    console.log(`   - 记录类型：CNAME`);
    console.log(`   - 记录值：gantanhaoo.github.io`);
    console.log('\n2. 在 GitHub Pages 设置中添加自定义域名');
    console.log('\n3. 提交并部署：');
    console.log('   git add .');
    console.log('   git commit -m "Configure custom domain"');
    console.log('   git push origin master');
    console.log('\n4. 等待 DNS 和 HTTPS 生效（通常几分钟到几小时）\n');
}

// 从命令行参数获取域名
const domain = process.argv[2];

if (domain) {
    updateDomain(domain);
    rl.close();
} else {
    console.log('请输入你的域名（例如：snake.yourdomain.com 或 yourdomain.com）');
    rl.question('域名: ', (answer) => {
        if (answer.trim()) {
            updateDomain(answer.trim());
        } else {
            console.log('未输入域名，退出。');
        }
        rl.close();
    });
}

