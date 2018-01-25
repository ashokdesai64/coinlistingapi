var db=require('../dbconnection'); //reference of dbconnection.js
 
var Coins={
    
    getAllCurrency:function(params,callback) {
        return db.query("SELECT id,currency_symbol,currency_name FROM currency WHERE status=1 ORDER BY id ASC",callback);
    },
    
    getAllCoin:function(params,callback) {
        var currencyName = '';
        var currencyPrice = '';
        var userid = 0;
        if(params.userid != '' && params.userid != undefined) {
            userid = params.userid;
        }
        if(params.convert != '' && params.convert != undefined) {
            currencyName= params.convert;

            this.convertCurrency(currencyName,function (err, rows) {
                if(rows) {
                    currencyPrice = JSON.parse(JSON.stringify(rows[0][currencyName]));
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, ch.price_usd * "+currencyPrice+" as price_"+currencyName+", ch.24h_volume_usd * "+currencyPrice+" as 24h_volume_"+currencyName+", ch.market_cap_usd * "+currencyPrice+" as market_cap_"+currencyName+", UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated,IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC",callback);
                } else {
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated, IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC",callback);
                }
            });
        } else {
                return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated, IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC",callback);
                //     if(err){
                //         return callback(err);
                //     } else {
                //         for (var i = 0; i < result.length; i++) {
                //             var currentPrice = result[i].price_usd;
                //             result[i].percent_change_1m = '10';
                //         }
                //         return callback(result);
                        
                //     } 
                // });
        }
    },
    
    convertCurrency:function(params,callback) {
        currencyName= params;
        return db.query("SELECT "+currencyName+" FROM currency_history ORDER BY currency_timestamp DESC LIMIT 1",callback);
    },

    getAllCoinByLimit:function(params,callback) {
        var currencyName = '';
        var currencyPrice = '';
        var userid = 0;
        if(params.userid != '' && params.userid != undefined) {
            userid = params.userid;
        }
        if(params.convert != '') {
            currencyName= params.convert;

            this.convertCurrency(currencyName,function (err, rows) {
                if(rows) {
                    currencyPrice = JSON.parse(JSON.stringify(rows[0][currencyName]));
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, ch.price_usd * "+currencyPrice+" as price_"+currencyName+", ch.24h_volume_usd * "+currencyPrice+" as 24h_volume_"+currencyName+", ch.market_cap_usd * "+currencyPrice+" as market_cap_"+currencyName+", UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated, IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC LIMIT "+params.limit,callback);
                } else {
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated, IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC LIMIT "+params.limit,callback);
                }
            });
        } else {
            return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated, IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC LIMIT "+params.limit,callback);
        }
    },
    
    getAllCoinByStart:function(params,callback) {
        var currencyName = '';
        var currencyPrice = '';
        var userid = 0;
        if(params.userid != '' && params.userid != undefined) {
            userid = params.userid;
        }
        if(params.convert != '') {
            currencyName= params.convert;

            this.convertCurrency(currencyName,function (err, rows) {
                if(rows) {
                    currencyPrice = JSON.parse(JSON.stringify(rows[0][currencyName]));
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, ch.price_usd * "+currencyPrice+" as price_"+currencyName+", ch.24h_volume_usd * "+currencyPrice+" as 24h_volume_"+currencyName+", ch.market_cap_usd * "+currencyPrice+" as market_cap_"+currencyName+", UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated FROM coins WHERE ch.status=1 AND ch.rank > "+params.start+" ORDER BY rank ASC",callback);
                } else {
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated, IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 AND ch.rank > "+params.start+" ORDER BY rank ASC",callback);
                }
            });
        } else {
            return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated, IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 AND ch.rank > "+params.start+" ORDER BY rank ASC",callback);
        }
    },

    getAllCoinByRange:function(params,callback) {
        var currencyName = '';
        var currencyPrice = '';
        var userid = 0;
        if(params.userid != '' && params.userid != undefined) {
            userid = params.userid;
        }
        if(params.convert != '') {
            currencyName= params.convert;

            this.convertCurrency(currencyName,function (err, rows) {
                if(rows) {
                    currencyPrice = JSON.parse(JSON.stringify(rows[0][currencyName]));
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`,ch.price_usd * "+currencyPrice+" as price_"+currencyName+", ch.24h_volume_usd * "+currencyPrice+" as 24h_volume_"+currencyName+", ch.market_cap_usd * "+currencyPrice+" as market_cap_"+currencyName+", UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated,IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC LIMIT "+params.start+","+params.limit,callback);
                } else {
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated,IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC LIMIT "+params.start+","+params.limit,callback);
                }
            });
        } else {
            return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated,IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 ORDER BY ch.rank ASC LIMIT "+params.start+","+params.limit,callback);
        }
    },

    getCoinByName:function(params,query,callback) {
        var currencyName = '';
        var currencyPrice = '';
        var userid = 0;
        if(params.userid != '' && params.userid != undefined) {
            userid = params.userid;
        }
        if(query.convert) {
            currencyName= query.convert;

            this.convertCurrency(currencyName,function (err, rows) {
                if(rows) {
                    currencyPrice = JSON.parse(JSON.stringify(rows[0][currencyName]));
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, ch.price_usd * "+currencyPrice+" as price_"+currencyName+", ch.24h_volume_usd * "+currencyPrice+" as 24h_volume_"+currencyName+", ch.market_cap_usd * "+currencyPrice+" as market_cap_"+currencyName+", UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated,IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 AND ch.id='"+params.name+"'",callback);
                } else {
                    return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated,IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 AND ch.id='"+params.name+"'",callback);
                }
            });
        } else {
            return db.query("SELECT ch.`id` as coin_id, ch.`name`, ch.`symbol`, ch.`rank`, ch.`price_usd`, ch.`price_btc`, ch.`24h_volume_usd`, ch.`market_cap_usd`, ch.`available_supply`, ch.`total_supply`, ch.`percent_change_1h`, ch.`percent_change_24h`, ch.`percent_change_7d`,ch.`percent_change_1m`,ch.`percent_change_1y`,ch.`percent_change_all`, UNIX_TIMESTAMP(ch.`last_updated`)*1000 as last_updated,IF(ct.status,ct.status,0) as followstatus FROM coins as ch LEFT JOIN coins_track as ct ON ch.id=ct.coin_id and ct.user_id="+userid+" WHERE ch.status=1 AND ch.id='"+params.name+"'",callback);
        }
    },

    getTotalCoins:function(params,callback) {
        return db.query("SELECT count(no) as totalcoins, SUM(24h_volume_usd) as totalvolume, SUM(market_cap_usd) as totalmarketcap FROM `coins` WHERE status = 1",callback);
    },

    getCoinHistoryByTime:function(params,callback) {
        return db.query("SELECT price_usd as price,timestamp FROM coins_history WHERE coin_id=? AND timestamp BETWEEN ? AND ?",[params.name,params.starttime,params.endtime],callback);
    },

    getCoinHistory:function(params,callback) {
        return db.query("SELECT price_usd as price,timestamp FROM coins_history WHERE coin_id=? group by DATE_FORMAT(FROM_UNIXTIME(timestamp/1000), '%Y-%m-%d') ",[params.name],callback);
    }

// getAllTasks:function(callback){
 
// return db.query("Select username,email from user",callback);
 
// },
//  getUserByEmail:function(email,callback){
 
// return db.query("select * from user where email=?",[email],callback);
//  },
//  addUser:function(Task,callback){
//  return db.query("Insert into user (`username`,`email`,`password`) values ('"+Task.username+"','"+Task.email+"',MD5('"+Task.password+"'))",callback);
//  },
//  deleteUser:function(id,callback){
//   return db.query("delete from user where id=?",[id],callback);
//  },
//  updateUser:function(id,Task,callback){
//   return db.query("update user set username=?,email=? where id=?",[Task.username,Task.email,id],callback);
//  }
 
};
 module.exports=Coins;