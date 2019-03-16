const fs = require('fs')
const path = require('path')

let rm_path = './rm'

// fs.rmdir() 不能删除非空目录
// 1 使用同步方法 
// 2 定义函数
function removeDir(base){
  // 3 使用readdir方法读取目录下所有文件
  let files = fs.readdirSync(base)
  // 4 遍历这些文件，判断当前文件的类型 
  files.forEach(file => {
    let file_full_path = path.join(base, file);
    // 5 如果是普通文件类型 那么就直接使用unlinkSync方法删除当前文件
    if(fs.statSync(file_full_path).isFile()){
      fs.unlinkSync(file_full_path)
    } else { // 6 如果是目录类型，此时就开始递归了。
      removeDir(file_full_path)
    }
  })
  // 7 遍历结束，表示当前目录 已经是空的了，就可以使用rmdirSync来删除了。
  fs.rmdirSync(base)
}

// 测试
removeDir(rm_path)