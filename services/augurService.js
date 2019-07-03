var Augur = require('augur.js');
var express = require('express');


  //const  universeId ='0xe0fb73227c37051611c3edc091d6858f2a230ffe';
  const  universeId ="0xaa88b74da9e08d44c996f037ce13cb2711053cea"
 class AugurConnection{

    //public augur: AugurConn;

    constructor(){
        let ethereumNode = {
            httpAddresses: [
           //   "http://127.0.0.1:8545", 
//              "https://rinkeby.augur.net/ethereum-http"

		"https://eth-rinkeby.alchemyapi.io/jsonrpc/xWkVwAbM7Qr-p8j-Zu_PPwldZJKmaKjx"
            ],
            wsAddresses: [
             // "ws://127.0.0.1:8546", 
            //  "wss://kovan.augur.net/ethereum-ws " 
            ]
    
          }; 
        let augurNode = "wss://dev.augur.net/augur-node";
         //let augurNode = "ws://127.0.0.1:9001";

        this.augur = new Augur();
        this.augur.connect({ ethereumNode, augurNode }, (err, connectionInfo) => {
            if (err != null){
                console.log("Connected");
            }
          });
    }


    async getCategoryData(req, res){
      console.log(this.augur.markets)
        this.augur.markets.getCategories({

            sortBy: "popularity",
            isSortDescending: true
        }, function (error, result){
          console.log('r',result);
            res.status(200).send(JSON.stringify(result, null, 2))
        });
    }

    async getMarkets(req, res){

        this.augur.markets.getMarkets({

            sortBy: "popularity",
            isSortDescending: true
        }, function (error, result){
          console.log('mr',result);
            //res.status(200).send(JSON.stringify(result, null, 2))
        });
    }

    async getMarketData(req, res){
        let marketId = req.query.marketId;
        this.augur.markets.getMarketsInfo({
            marketIds: [marketId]
        }, function (error, result){
            if (error != null || result == null){
                res.status(404).send(JSON.stringify(result, null, 2));
            }
            else {
            let out = result[0].outcomes;
            res.status(200).send(JSON.stringify(out, null, 2));
            }
        });
    }

//Example Market
//0x7ff5587568854bebe22fc75d663dacd4b6aaceb9
}

module.exports=AugurConnection;
