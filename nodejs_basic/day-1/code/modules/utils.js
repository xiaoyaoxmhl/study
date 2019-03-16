const PI = 3.14 // 私有的
// 对外的接口
let MyMath = {
    area: r => PI * r * r,
    zhouchang: r => 2 * PI * r
}
// function area(r){
//     return PI * r * r
// }

// function zhouchang(r){
//     return 2 * PI * r
// }

// module.exports = {} 默认为空对象
// 对外暴露接口
// module.exports.area = area
// module.exports.zhouchang = zhouchang

// exports = module.exports = {}
// exports.area = area
// exports.zhouchang = zhouchang
// 替换掉之前的空对象，来暴露接口
// module.exports = MyMath
// exports = MyMath