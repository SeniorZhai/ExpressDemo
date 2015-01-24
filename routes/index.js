module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index', {title: 'Express'});
    });
    app.get('/zoe', function (req, res) {
        res.render('index', {title: 'Zoe'});
    })
};