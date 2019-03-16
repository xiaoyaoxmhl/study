$(function() {
  const COLORS = [
    "#e21400",
    "#91580f",
    "#f8a700",
    "#f78b00",
    "#58dc00",
    "#287b00",
    "#a8f07a",
    "#4ae8c4",
    "#3b88eb",
    "#3824aa",
    "#a700ff",
    "#d300e7"
  ];

  let nickname = "", // 存储客户端的昵称
    connected = false; // 判断客户端是否登录成功

  const $window = $(window);
  const $usernameInput = $(".usernameInput");
  const $loginPage = $(".login.page");
  const $chatPage = $(".chat.page");
  const $inputMessage = $('.inputMessage')
  const $messages = $('.messages')

  // 连接服务器
  // const socket = io('ws://localhost:1234')
  const socket = io();

  // events
  $window.on("keydown", function(e) {
    if (e.which == 13) {
      if (!nickname) {
        // 如果没有设置昵称
        nickname = $usernameInput.val();
        $loginPage.hide(200);
        $chatPage.show(200);
        socket.emit("new user", nickname);
      } else {
        // 否则 表示 发送消息
        sendMsg();
      }
    }
  });

  socket.on("login", ({ state }) => {
    if (state) {
      connected = true;
    }
    let usermsg = `Hi, ${nickname}`
    log(usermsg, {prepend: true})
  });

  socket.on('new message', msg => {
    addChatMessage(msg)
  })

  // utils func
  function sendMsg() {
    let msg = $inputMessage.val().trim()
    if(!msg) return
    if(connected){
      $inputMessage.val('')
      addChatMessage({
        nickname: nickname,
        message: msg
      })
      socket.emit('new message', msg)
    }
      
  }

  function getUsernameColor(username) {
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  function addChatMessage(data){
    let $nicknameSpan = $('<span class="username" />')
      .text(data.nickname)
      .css('color', getUsernameColor(data.nickname))

    let $msgBodySpan = $('<span class="messageBody" />').text(data.message)

    let $messageLi = $('<li class="message" />')
        .append($nicknameSpan)
        .append($msgBodySpan)

    addMessageElement($messageLi)
  }

  function addMessageElement(el, options){
    var $el = $(el)

    options = options || {}

    if(typeof options.prepend === 'undefined'){
      options.prepend = false
    }

    if(options.prepend){
      $messages.prepend($el);
    } else {
      $messages.append($el)
    }

    $messages.get(0).scrollTop = $messages.get(0).scrollHeight
  }

  function log(msg, options){
    var $el = $('<li>').addClass('log').text(msg)

    addMessageElement($el, options)
  }
});
