const Router = require('koa-router');
let router = new Router();
let musicController = require('../controllers/music_controller');

// 音乐路由
router.get('/music/index',musicController.showIndex ) // 首页
.post('/music/add-music',musicController.addMusic ) //上传音乐
.get('/music/add-music',musicController.showAddMusic)

module.exports = router;