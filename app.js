/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();

// テンプレートファイルを置くパスを設定。デフォルトは "process.cwd() + '/views'"
app.set('views', 'views');

app.set('view engine', 'ejs');

/* 2. listen()メソッドを実行して4000番ポートで待ち受け。*/
var server = app.listen(4000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.use(express.static('public/lunchmatch'));

app.get("/", function(req, res, next){
    res.render('lunchmatch/index.ejs');
});

calc_game_app = express();
calc_game_app.set('views', 'views');
calc_game_app.set('view engine', 'ejs');

var calc_game_server = calc_game_app.listen(4001, function(){
    console.log("Node.js is liustening to PORT" + calc_game_server.address().port);
});

calc_game_app.use(express.static('public/calc_game'));

calc_game_app.get("/", function(req, res, next){
    res.render('calc_game/index.ejs');
});
