const qs = require('querystring')

const obj = {
    name: '多多',
    age: 18
}

console.log(qs.stringify(obj, '|', ':'));  // name:duoduo|age:18
console.log(qs.parse('name:duoduo|age:18', '|', ':'))

// $.ajax({
//     url: '/api/users',
//     method: 'GET',
//     data: {
//         name: 'duoduo',
        
//     },
//     ...
// })

// url => /api/users?name=duoduo

// xhr  = new XMLHttpRequest()
// data = {}
// xhr.open(type,URL)

encode_str = qs.escape('name=多多&age=18')
console.log(encode_str)
// sql注入
console.log(qs.unescape(encode_str))