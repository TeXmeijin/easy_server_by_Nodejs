/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();

// テンプレートファイルを置くパスを設定。デフォルトは "process.cwd() + '/views'"
app.set('views', 'views');

app.set('view engine', 'ejs');

/* 2. listen()メソッドを実行して4000番ポートで待ち受け。*/
var server = app.listen(4001, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.use(express.static('public'));

app.get("/calc_game/index", function(req, res, next){
    res.render('index.ejs');
});