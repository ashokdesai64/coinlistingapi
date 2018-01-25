var mysql=require('mysql');
var connection=mysql.createPool({
 
host:'35.176.71.92',
port:'3306',
 user:'root',
 password:'coinlistin@1234',
 database:'coinlisting'
 
});
 module.exports=connection;