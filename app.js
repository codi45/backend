var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var  AugurConnection = require('./services/augurService');
const augur = new AugurConnection();

//console.log(augur.augur)
var cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/augurCategories', (req, res) => augur.augur.markets.getMarkets(req, res));


/*
app.get('/markets', (req, res) => augur.augur.api.Universe.getCurrentFeeWindow((err,result)=>{
	 res.status(404).send(JSON.stringify(result, null, 2));
}));
*/
/*
app.get('/markets', (req, res) => augur.augur.markets.getCategories({
  universe: "0x02149d40d255fceac54a3ee3899807b0539bad60",
}, function (error, result) {
  res.status(404).send(JSON.stringify(result, null, 2));
}));


app.get('/markets', (req, res) =>augur.augur.markets.getMarkets({
  universe: "0x02149d40d255fceac54a3ee3899807b0539bad60",
  search: "category: Ethereum OR tags: ETH"
}, function (error, result) {
  res.status(404).send(JSON.stringify(result, null, 2));
}));


*/

app.get('/markets', (req, res) =>augur.augur.markets.getMarkets({
  universe: "0x02149d40d255fceac54a3ee3899807b0539bad60",
  search: "category: Ethereum OR tags: ETH"
}, function (error, result) {


augur.augur.markets.getMarketsInfo({
  marketIds:result,
}, function (error, result) {  res.status(404).send(JSON.stringify(result, null, 2));
})


}));

/*
app.get('/markets', (req, res) => augur.augur.trading.getUserTradingHistory({

  marketId: "0x98c189f9254b5729eb870688f812b83ebd116798",
  outcome: 0,
  sortBy: "price",
}, function (error, result) {
  res.status(404).send(JSON.stringify(result, null, 2));
})

  );


/*


/*

[
"0x78c223b25a2f48122179141563350ad8112c6d5f",
"0x98c189f9254b5729eb870688f812b83ebd116798",
"0x4545e82316caf6a29832d7ffdc83a974e55c63cb",
"0x05c966eb966330e418f8c668f472759b3df93d54",
"0xa47f967c4806d34859ec93013be5ebc4d68f3a64",
"0xafaa8441cb07b23308a3710bd5eef788f08902fa",
"0x554c84356451f2e88a5fab4840d9a5019a864add",
"0xa37ffbde556409707a4a779ce439696bb72ad185",
"0x174c3da49dd6ffc3259b90ffe401c32bd3d876a2",
"0xae27ec994477a38ce96963e1ab63e316cd3dcc86",
"0x32405d19c5582dbec0d0faad650b8edb22bece8b",
"0xdbaac576232cf003854e7676203cf34343906903",
"0xeb6fece1dd046896e69152d1647a390a6bc193be",
"0xec05e2b1b4bd99b490acf7b7561cc83e518767aa",
"0xf182f03b565ea535cde38fdc3134789555c828ea",
"0xfa26157e03f05ca681997e63db25af1a95239243"
]

*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//id=0xd492cb5945497421feb450ae1215fbbe615d42ff

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

module.exports = app;
