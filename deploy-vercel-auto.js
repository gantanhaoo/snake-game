const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 开始自动部署到 Vercel...\n');

try {
    // 检查是否已经登录
    try {
        execSync('vercel whoami', { stdio: 'pipe' });
        console.log('✅ Vercel 已登录\n');
    } catch (error) {
        console.log('❌ 未登录 Vercel，请先运行: vercel login');
        console.log('   或者直接在浏览器中登录 Vercel 后重试\n');
        process.exit(1);
    }

    // 部署项目 - 使用 --yes 自动确认所有提示
    console.log('📦 正在部署项目...');
    console.log('   这将自动使用免费域名（.vercel.app）\n');
    
    const deployOutput = execSync('vercel --yes --prod', { 
        encoding: 'utf8',
        stdio: 'pipe'
    });

    // 从输出中提取部署URL
    const urlMatch = deployOutput.match(/https:\/\/[\w-]+\.vercel\.app/g);
    
    if (urlMatch && urlMatch.length > 0) {
        const deploymentUrl = urlMatch[urlMatch.length - 1]; // 获取最后一个URL（通常是生产环境）
        
        console.log('\n✅ 部署成功！\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('🌐 你的免费域名:');
        console.log(`   ${deploymentUrl}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        
        // 保存URL到文件
        fs.writeFileSync('VERCEL_URL.txt', deploymentUrl, 'utf8');
        console.log('📝 域名已保存到 VERCEL_URL.txt 文件\n');
        
        // 尝试打开浏览器
        try {
            const open = require('open');
            open(deploymentUrl);
            console.log('🌐 正在浏览器中打开...\n');
        } catch (error) {
            // 如果open模块不存在，忽略
        }
    } else {
        console.log('\n✅ 部署完成！');
        console.log('   请查看上面的输出获取部署URL\n');
    }
    
} catch (error) {
    console.error('\n❌ 部署失败:');
    if (error.stdout) {
        console.error(error.stdout);
    }
    if (error.stderr) {
        console.error(error.stderr);
    }
    process.exit(1);
}

