var mysql = require('mysql');
// 
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "epytodo"
});
// 

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("show databases", function (err, result) {
      if (err) throw err;
      for (i = 0; result[i]; i++)
        console.log(result[i]);
    });
  });