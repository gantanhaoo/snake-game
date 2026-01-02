#!/usr/bin/env node

/**
 * DNS 配置检查脚本
 * 检查域名 DNS 是否已正确配置
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);

const domain = 'snakegame2024.tk';
const target = 'gantanhaoo.github.io';
const expectedIPs = [
    '185.199.108.153',
    '185.199.109.153',
    '185.199.110.153',
    '185.199.111.153'
];

console.log('🔍 DNS 配置检查工具');
console.log('═'.repeat(50));
console.log(`检查域名: ${domain}`);
console.log(`期望指向: ${target}`);
console.log('═'.repeat(50));
console.log('');

async function checkDNS() {
    try {
        console.log('正在检查 DNS 配置...\n');
        
        // 检查 DNS 解析
        let command;
        if (process.platform === 'win32') {
            command = `nslookup ${domain}`;
        } else {
            command = `dig +short ${domain}`;
        }
        
        try {
            const { stdout, stderr } = await execAsync(command, { 
                timeout: 10000,
                encoding: 'utf8'
            });
            
            if (stderr && !stdout) {
                console.log('❌ DNS 解析失败');
                console.log('错误信息:', stderr);
                console.log('');
                console.log('可能的原因：');
                console.log('  1. DNS 记录尚未配置');
                console.log('  2. DNS 记录配置错误');
                console.log('  3. DNS 还未生效（需要等待几分钟到几小时）');
                console.log('  4. 网络连接问题');
                return false;
            }
            
            const output = stdout || stderr;
            console.log('DNS 查询结果:');
            console.log('─'.repeat(50));
            console.log(output);
            console.log('─'.repeat(50));
            console.log('');
            
            // 检查是否包含目标 IP 或域名
            const isConfigured = expectedIPs.some(ip => output.includes(ip)) || 
                                output.includes(target) ||
                                output.includes('github.io');
            
            if (isConfigured) {
                console.log('✅ DNS 配置看起来正确！');
                console.log('   域名已指向 GitHub Pages');
                console.log('');
                console.log('下一步：');
                console.log('  1. 确认 GitHub Pages 设置中已配置自定义域名');
                console.log('  2. 等待 HTTPS 证书生效（通常 10 分钟到几小时）');
                console.log('  3. 访问 https://' + domain + ' 测试');
                return true;
            } else {
                console.log('⚠️  DNS 配置可能不正确');
                console.log('   未检测到 GitHub Pages 的 IP 地址或 CNAME 记录');
                console.log('');
                console.log('请确认：');
                console.log('  1. 已在域名服务商处添加 DNS 记录');
                console.log('  2. CNAME 记录指向: ' + target);
                console.log('  3. 已等待足够时间让 DNS 生效');
                return false;
            }
            
        } catch (error) {
            console.log('❌ DNS 查询失败');
            console.log('错误信息:', error.message);
            console.log('');
            console.log('提示：');
            console.log('  1. 检查网络连接');
            console.log('  2. 尝试使用其他 DNS 服务器（如 8.8.8.8）');
            console.log('  3. 如果 DNS 刚刚配置，请等待几分钟后重试');
            return false;
        }
        
    } catch (error) {
        console.error('❌ 检查过程出错:', error.message);
        return false;
    }
}

// 运行检查
checkDNS().then((success) => {
    if (!success) {
        console.log('');
        console.log('📖 需要帮助？运行以下命令查看详细配置步骤：');
        console.log('   node setup-dns-auto.js');
        process.exit(1);
    } else {
        process.exit(0);
    }
}).catch((error) => {
    console.error('❌ 错误:', error);
    process.exit(1);
});

