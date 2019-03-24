module.exports = {
    rewriteUrlList:[
      { src:'/a',dist:'/user/login' },
      { regex:/^\/public\/(.*)/  }, // 为了解决前端的/public 多余
      { regex:/^\/xx/,dist:'/user/login'},
      { src:'/',dist:'/user/login'} // 为了访问/ 有登录页看
    ],
    port:9999,
    dbConfig: {
      connectionLimit: 10,
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'node_music'
  }
}


