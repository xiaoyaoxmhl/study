const url = require('url')

// console.log(url.parse('http://xxx.com/index?id=1#page'))

// const url_obj = {
//     protocol: 'https:',
//     host: 'douniwan.com.cn',
//     pathname: '/user/profile',
//     // search: '?page=1'
//     query: 'page=1'
// }

// console.log(url.format(url_obj))
url.resolve('/one/two/three', 'four');         // '/one/two/four'
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
console.log(url.resolve('http://example.com/one/', './two')); 
//  'http://example.com/one/two'
// / => 根  /two 在根目录下的two目录
console.log(url.resolve('/one/two/three/', './four'))
console.log(url.resolve('/one/two/three', '../four'))
console.log(url.resolve('http://example.com/one', './two'))