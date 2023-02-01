var express = require('express')
const oracledb = require('oracledb')
var app = express();
let ta = 0
let tb = 0
var cnx

//oracle cnx setup
oracledb.getConnection(
{
   user          : "a",
   password      : "a",
   connectString : "(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))"
}
).then((connection) => {
   if (connection) {
   console.log("Successfully connected to DB!");
   cnx = connection;
   }
}).catch((err) => {console.log(`Conexiune esuata! ${err}`);})

//header magic
app.use((req,res,next)=>{
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
   res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
   next(); 
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

app.post('/menu/name/:name/price/:price/score/:score/mode/:mode', async (req, res) => {
   if (req.params.mode == "delete") {
      sql = "delete from menu where(" + "name =" + "'" + req.params.name + "'" +  "and price =" + "'" + req.params.price + "'" + "and score =" + "'" + req.params.score + "'" +  ")"
      await cnx.execute(sql)
      await cnx.commit()
   }
   else{
      sql = "insert into menu values(" + "'" + ta + "'" + "," + "'" + req.params.name + "'" +  "," + "'" + req.params.price + "'" + "," + "'" + req.params.score + "'" + ")"
      await cnx.execute(sql)
      await cnx.commit()
      ta++
   }
})

app.post('/menu/name/:name/quantity/:quantity/address/:address/mode/:mode', async (req, res) => {
  if (req.params.mode == "delete") {
      sql = "delete from ordre where(" + "destorder =" + "'" + req.params.name + "'" +  "and quantity =" + "'" + req.params.quantity + "'" + "and adress =" + "'" + req.params.address + "'" +  ")"
      await cnx.execute(sql)
      await cnx.commit()
  }
  else{
      sql = "insert into ordre values(" + "'" + tb + "'" + "," + "'" + req.params.name + "'" +  "," + "'" + req.params.quantity + "'"  + "," + "'" + req.params.address + "'" + ")"
      await cnx.execute(sql)
      await cnx.commit()
      tb++
  }
})

app.get('/browse', async (req, res) => {
   sql = "select * from menu"
   const stream = await cnx.queryStream(sql)
   const list = []
   stream.on('data', (row) => {
      let a  = {name : "", price : 0, rating: 0}
      a.name = row[1]
      a.price = row[2]
      a.rating = row[3]
      list.push(a)
   });

   stream.on('end', () => {
      json = JSON.stringify(list)
      res.send(json)
   });
})

app.get('/order', async (req, res) => {
   sql = "select * from ordre"
   const stream = await cnx.queryStream(sql)
   const list = []
   stream.on('data', (row) => {
      let a  = {name : "", quantity : 0, adr: ""}
      a.name = row[1]
      a.quantity = row[2]
      a.adr = row[3]
      list.push(a)
   });

   stream.on('end', () => {
      json = JSON.stringify(list)
      res.send(json)
   });
})