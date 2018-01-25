var express = require('express');
var router = express.Router();
var Coins = require('../models/Coinsmodel');
var expressValidator = require('express-validator');
// var validate = require('express-validation')
// var Joi = require('joi');


router.get('/list', function (req, res, next) {
  if(req.query.limit && req.query.start && !isNaN(req.query.limit) && !isNaN(req.query.start) && req.query.limit > 0) {
    Coins.getAllCoinByRange(req.query,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Coin listing successfully","status":true});
      }

    });
  } 
  else if(!isNaN(req.query.start) && req.query.start > 0 ) {
    Coins.getAllCoinByStart(req.query,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Coin listing successfully","status":true});
      }

    });
  }
  else if(!isNaN(req.query.limit) && req.query.limit > 0 ) {
    Coins.getAllCoinByLimit(req.query,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Coin listing successfully","status":true});
      }

    });
  } else {
    Coins.getAllCoin(req.query,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Coin listing successfully","status":true});
      }

    });
  }
});

router.get('/list/:name?', function (req, res, next) {
    
    Coins.getCoinByName(req.params,req.query,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        res.json({"data":rows,"message":"Coin listing successfully","status":true});
      }

    });
});

router.get('/currencylist', function (req, res, next) {
    
    Coins.getAllCurrency(req.params,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        if(typeof rows !== 'undefined' && rows.length > 0) {
            res.json({"data":rows,"message":"Currency listing successfully","status":true});
        }
        else {
            res.json({"message" : "No data found","status" : false});
        }
      }

    });
});

router.get('/totalcoins', function (req, res, next) {
    
    Coins.getTotalCoins(req.params,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
        if(typeof rows !== 'undefined' && rows.length > 0) {
            res.json({"data":rows[0],"message":"Coins total listing successfully","status":true});
        }
        else {
            res.json({"message" : "No data found","status" : false});
        }
      }

    });
});

router.get('/history/:name?/:starttime?/:endtime?', function (req, res, next) {
  if (req.params.starttime && req.params.endtime) {
    Coins.getCoinHistoryByTime(req.params,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
          res.json(rows);
      }

    });
  } else if(req.params.name && !req.params.starttime && !req.params.endtime){
    Coins.getCoinHistory(req.params,function (err, rows) {
      if (err) {
        res.json(err);
      }
      else {
       
          res.json(rows);
      }

    });
  } else {
    res.json({status:"no data found"});
  }
});



/* GET users listing. */


// router.get('/userlist', function (req, res, next) {
//   Coins.getAllCoinss(function (err, rows) {
//     if (err) {
//       res.json(err);
//     }
//     else {
//       res.json(rows);
//     }

//   });
// });

// router.post('/login', function (req, res) {

//   var errors = req.validationErrors(); 
//   if( !errors){   //No errors were found.  Passed Validation!
//         res.render('index', { 
//             title: 'Form Validation Example',
//                 message: 'Passed Validation!',
//                 errors: {}
//         });
       
//     }
//     else {   //Display errors to user
//         res.render('index', { 
//             title: 'Form Validation Example',
//             message: '',
//             errors: errors
//         });
//     }
//   res.json(req.body);

// });

// router.post('/userregister', function (req, res) {
//   Coins.addUser(req.body, function (err, count) {
//     if (err) {
//       res.json(err);
//     }
//     else {
//       res.json(count);
//     }

//   });
// });

// router.put('/updateuser/:id', function (req, res) {
//   Coins.updateUser(req.params.id, req.body, function (err, count) {
//     if (err) {
//       res.json(err);
//     }
//     else {
//       res.json(count);
//     }

//   });
// });

// router.delete('/deleteuser/:id', function (req, res) {
//   Coins.deleteUser(req.params.id, function (err, count) {
//     if (err) {
//       res.json(err);
//     }
//     else {
//       res.json(count);
//     }

//   });
// });

module.exports = router;
