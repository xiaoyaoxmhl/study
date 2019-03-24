module.exports = compose

function compose(middlewares){
  // check type
  if(!Array.isArray(middlewares)) throw new TypeError('Middleware stack must be an array!')
  // check all item type
  for(let fn of middlewares){
    if(typeof fn !== 'function') throw new TypeError('Middleware must be an function!')
  }

  return function(context, next){
    // 递归
    let index = -1; // 存储当前执行的中间件 索引
    return dispatch(0)

    function dispatch(i){
      if(i < index) throw new Error('next() called multiple times')
      index = i
      fn = middlewares[i]

      if(!fn) return

      fn(context, dispatch.bind(null, i + 1))
    }
  }
}
