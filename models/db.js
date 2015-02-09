/**
 * Created by zhaitao on 15/1/24.
 */
var settings = require('../settings'),
    Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

// 创建DataBase实例，传入的参数分别是数据库地址、port数据库的端口号
module.exports = new Db(settings.db, new Server(settings.host, settings.port), {safe: true});