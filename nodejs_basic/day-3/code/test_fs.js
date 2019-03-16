const fs = require("fs");

// fs.writeFile('./log.txt', '这是一条日志内容。', err => {
//   if(err) return console.log('写入失败');
//   console.log('写入成功');
// })

// fs.writeFile('./log.txt', '这是一条日志内容。', {encoding: 'utf-8'}, err => {
//   if(err) return console.log('写入失败');
//   console.log('写入成功');

//   fs.copyFile('./log.txt', './views/log.txt', err => {
//     // ... 略过
//     if(err) return console.log(err);
//     console.log('succ');
//   })
// })

// fs.writeFile('./log.txt', '这是一条新的日志内容。', {flag: 'a'}, err => {
//   if(err) return console.log('写入失败');
//   console.log('写入成功');
// })

// fs.readFile('./log.txt', {encoding: 'utf-8'}, (err, data) => {
//   if(err) return console.log('读取文件错误')
//   console.log(data);
// })

// fs.unlink('./log.txt', err => {
//   if(err) return console.log('remove failed')
//   console.log('success')
// })

// fs.mkdir('./models', err => {
//   if(err) return console.log('failed')
//   console.log('succ');
// })

// fs.readdir('./views', (err, files) => {
//   if(err) return console.log('读取失败')
//   console.log(files);
// })

// fs.rmdir('./models', err => {
//   if(err) return console.log('失败')
//   console.log('成功');
// })

// fs.rmdir('./views', err => {
//   if(err) return console.log('失败')
// })

// 读取目录下的所有文件，打印到终端
// 1：读取当前目录下所有文件；
// 2：遍历这些文件
// 3：判断当前文件类型，如果是目录就递归了
// 4：如果是普通文件，那么打印到终端
// error
// 如果用异步方法来读取，极有可能产生回调地狱。
// function readAllFiles(base) {
//   fs.readdir(base, (err, files) => {

//   })
// }
const path = require("path");
function readAllFiles(base) {
  // try {
  //   let files = fs.readdirSync(base);
  // } catch (err) {

  // }
  let files = fs.readdirSync(base);
  files.forEach(file => {
    // 获取当前文件信息-对象
    let stat = fs.statSync(path.join(base, file));
    // 如果当前文件类型为file的话
    if (stat.isFile()) {
      console.log(file);
    } else {
      // 目录类型
      readAllFiles(path.join(base, file));
    }
  });
}

readAllFiles("./views");
