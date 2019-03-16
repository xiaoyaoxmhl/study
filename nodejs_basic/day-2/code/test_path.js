const path = require('path')

// console.log(path)
// app.set('views', path.join(__dirname, 'views'))
// console.log(path.join('/foo', 'bar')) // 相对路径
// console.log(path.join('/foo/bar', '../maz'));
// console.log(path.join('/foo/bar', '../maz', './views'));

// console.log(path.resolve('/foo', 'bar')) 
// console.log(path.resolve('/foo/bar', '../maz'));
// console.log(path.resolve('/foo/bar', '../maz', './views'));
// console.log(path.join('./foo', 'bar'))
// console.log(path.resolve('./foo', 'bar')) 
/*
path.join 和 path.resolve方法的区别：
  前者返回 的是 相对路径
  后者返回 的是 绝对路径

  使用方式 一致。
*/
// 手动路径可以吗？ 不可以的
// let dir_name = 'root'
// let path_test = '/users' + '/' + dir_name; // 针对windows系统 就会危险

let path_obj = path.parse('/root/users/log.txt')

console.log(path_obj)

console.log(path.format(path_obj));

console.log(path.basename('/root/users/log.txt'))
console.log(path.extname('/root/users/log.txt'))
console.log(path.dirname('/root/users/log.txt'))