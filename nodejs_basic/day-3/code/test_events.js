const EventEmitter = require('events')

// 在实现自定义事件时 有两种方式
// 1： 就是直接new EventEmitter 来实现
// let myEvent = new EventEmitter();

// myEvent.on('aa', ()=> {
//   console.log('aa');
// })
// // 根据业务需求 触发该事件
// myEvent.emit('aa')
// 2； 使用es6中类class 通过继承来实现
class MyEvent extends EventEmitter {
  constructor(name){
    super() // 如果使用了constructor，那么必须先初始化父类
    this.name = name
  }
}

let myEvent = new MyEvent('jerry')

// myEvent.on('bb', function(val){
//   console.log(this) // this => myEvent
//   console.log(this.name) // jerry
// })

myEvent.on('bb', val => {
  console.log(this === module.exports)
})

myEvent.emit('bb', 10)

/*
在自定义事件中，要使用this的话，那么就不能使用箭头函数作为事件的处理程序；
  如果使用了箭头函数，那么此时this就是module.exports对象。
当然如果想要使用this（自定义事件对象）就必须使用function来定义的函数作为事件处理程序。
 */