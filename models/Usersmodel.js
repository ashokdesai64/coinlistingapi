var db=require('../dbconnection'); //reference of dbconnection.js
 
var Users={
	getUserDetailByEmail:function(params,callback) {
        return db.query("SELECT id,name,email,usertype FROM user WHERE email=? AND password=? LIMIT 1",[params.email,params.password],callback);
    },

    checkUserByEmail:function(params,callback) {
        return db.query("SELECT id FROM user WHERE email=? LIMIT 1",[params.email],callback);
    },

    addUser:function(params,callback) {
        db.query("INSERT INTO user (`name`, `email`, `password`, `usertype`) VALUES (?,?,?,?)",[params.name,params.email,params.password,params.usertype],function(err, result) {
            if(err){
                return (err,callback);
            } else {
                return db.query("SELECT id,name,email,usertype,user_image,status FROM user WHERE id=? LIMIT 1",[result.insertId],callback);
            }
        });
    },

    checkSocialUserByEmail:function(params,callback) {
        return db.query("SELECT id,name,email,usertype,user_image,status FROM user WHERE email=? LIMIT 1",[params.email],callback);
    },
    
    addSocialUser:function(params,callback) {
            db.query("INSERT INTO user (`name`, `email`, `password`, `user_image`, `usertype`) VALUES (?,?,?,?,?)",[params.name,params.email,params.password,params.photo,params.usertype],function(err, result) {
                if(err){
                    return (err,callback);
                } else {
                    return db.query("SELECT id,name,email,usertype,user_image,status FROM user WHERE id=? LIMIT 1",[result.insertId],callback);
                }
            });
    },

    addCoinTrack:function(params,callback) {
        db.query("SELECT id FROM coins_track WHERE coin_id=? AND user_id=?",[params.coinid,params.userid],function(err, result) {
	        if(err){
	        	return (err,callback);
	        } else {
                var timestamp = Date.now();
                if(typeof result !== 'undefined' && result.length > 0) {
                    return db.query("UPDATE coins_track SET status=? WHERE coin_id=? AND user_id=?",[params.status,params.coinid,params.userid],callback);
                } 
                else {
                    return db.query("INSERT INTO coins_track (`coin_id`,`user_id`,`status`,`timestamp`) VALUES(?,?,?,?)",[params.coinid,params.userid,params.status,timestamp],callback);
                }
	        }
        });
    }


};

module.exports=Users;