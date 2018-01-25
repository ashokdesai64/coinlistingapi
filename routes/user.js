var express = require('express');
var router = express.Router();
var payloadChecker = require('payload-validator');
var Users = require('../models/Usersmodel');

router.post('/login', function (req, res) {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    // res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    if(req.body) {
        var expectedPayload = {
            "email" : "",
            "password" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["email","password"],false);
        if(result.success) {
            Users.getUserDetailByEmail(req.body,function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {

                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        res.json({"data":rows[0],"message":"Your have a successfully login...","status":true});
                    }
                    else {
                        res.json({"message" : "Please check your email & password !","status" : false});
                    }
                }

            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

router.post('/register', function (req, res) {
    if(req.body) {
        var expectedPayload = {
            "name" : "",
            "email" : "",
            "password" : "",
            "usertype" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["name","email","password","usertype"],false);
        if(result.success) {
            Users.checkUserByEmail(req.body,function (err, rows) {
                if (err) {
                    res.json(err);
                  }
                else {
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        res.json({"message":"Email already exist","status":false});
                    }
                    else {
                        Users.addUser(req.body, function(err, rows) {
                            if (err) {
                                res.json(err);
                            }
                            else {
                                res.json({"data":rows[0],"message":"User register successfully","status":true});
                            }
                        }); 
                    }
                }
                
            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

router.post('/userbysocial', function (req, res) {
    if(req.body) {
        var expectedPayload = {
            "name" : "",
            "email" : "",
            "password" : "",
            "usertype" : ""
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["name","email","password","usertype"],false);
        if(result.success) {
            Users.checkSocialUserByEmail(req.body,function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    if(typeof rows !== 'undefined' && rows.length > 0) {
                        res.json({"data":rows[0],"message":"Your have a successfully login...","status":true});
                    }
                    else {
                        Users.addSocialUser(req.body, function(err, rows) {
                            if (err) {
                                res.json(err);
                            }
                            else {
                                res.json({"data":rows[0],"message":"Your have a successfully login...","status":true});
                            }
                        }); 
                    }
                }
                
            });
        } else {
            res.json({"message" : result.response.errorMessage});
        }
    } else {
        res.json({"message" : "request not correct"});
    }
});

router.post('/cointrackbyuser', function (req, res) {
    if(req.body) {
        var expectedPayload = {
            "coinid" : "",
            "userid" : "",
            "status" : "",
            "coinname" : "",
        };
        var result = payloadChecker.validator(req.body,expectedPayload,["coinid","userid","status","coinname"],false);
        if(result.success) {
            Users.addCoinTrack(req.body,function (err, rows) {
                if (err) {
                    res.json(err);
                }
                else {
                    if(req.body.status == 1) {
                        res.json({"data":rows,"message":"Now you have follow "+req.body.coinname,"status":true});
                    } else {
                        res.json({"data":rows,"message":"You have unfollow "+req.body.coinname,"status":true});
                    }
                }
            });
        }
        else {
            res.json({"message" : result.response.errorMessage});
        }
    }
    else {
        res.json({"message" : "request not correct"});
    }
});


module.exports = router;