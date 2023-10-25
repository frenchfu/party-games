const fs = require('fs-extra');
const path = require('path');

// 要複製的目錄路徑
const buildPath = path.join(__dirname, 'build');

// 目標複製位置
const targetPath = path.join(
  __dirname,
  '../src/main/resources/static'
);

// 清空目標資料夾
fs.emptyDirSync(targetPath);

// 執行複製操作
fs.copySync(buildPath, targetPath, { overwrite: true });

console.log('React應用程式打包結果已複製到目標資料夾中');
