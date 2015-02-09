var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');               //
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var routes = require('./routes/index');
var settings = require('./settings');                   // 数据库设置

var app = express();                                    // 生成一个express实例

app.set('views', path.join(__dirname, 'views'));        // 设置视图文件夹
app.set('view engine', 'ejs');                          // 设置模板引擎

app.use(flash());
app.use(session({
    secret:settings.cookieSecrect,                      // 防止篡改cookie
    key:settings.db,                                    // cookie的名字
    cookie:{maxAge: 1000 * 60 * 60 * 24 *30},           // 30天
    store: new MongoStore({                             // MongoStore实例用来把会话信息存储到数据库中
        db:settings.db,
        host:settings.host,
        port:settings.port
    })
}));
app.use(logger('dev'));                                 // 加载日志中间件
app.use(bodyParser.json());                             // 加载解析json的中间件
app.use(bodyParser.urlencoded({extended: true}));       // 加载解析urlencoded请求体的中间件
app.use(cookieParser());                                // 加载cookie的中间件
app.use(express.static(path.join(__dirname, 'public')));// 设置public文件夹为存放静态文件的目录

routes(app);

console.log('Express服务已开启!');
module.exports = app;