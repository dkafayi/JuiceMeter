import express from "express";
import mysql from "mysql";
import cors from "cors"

const app = express();

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"hurricane11",
  database:"Juice"
});

app.use(express.json());
app.use(cors());

app.get("/juices", (req,res) => {
    const q = "SELECT * FROM juice_table"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});


app.post("/juices", (req,res)=>{
  const q = "INSERT INTO juice_table (`first_name`, `last_name`, `offense`, `defense`, `miscellaneous`) VALUES (?)"
  const values = [
    req.body.first_name,
    req.body.last_name,
    req.body.offense,
    req.body.defense,
    req.body.miscellaneous
  ];

  db.query(q, [values], (err, data)=> {
    if (err) return res.json(err)
    return res.json("juice created")
  })
});

app.delete("/juices/:id", (req,res)=>{
  const juiceId = req.params.id;
  const q = "DELETE FROM juice_table WHERE id = ?"

  db.query(q,[juiceId], (err,data)=>{
    if (err) return res.json(err)
    return res.json("juice deleted")
  })
});

app.put("/juices/:id", (req,res)=>{
  const juiceId = req.params.id;
  const q = "UPDATE juice_table SET `first_name` = ?, `last_name` = ?, `offense` = ?, `defense` = ?, `miscellaneous` = ? WHERE id = ?";

  const values=[
    req.body.first_name,
    req.body.last_name,
    req.body.offense,
    req.body.defense,
    req.body.miscellaneous
  ];

  db.query(q,[...values,juiceId], (err,data)=>{
    if (err) return res.json(err)
    return res.json("juice updated")
  })
});

app.listen(8800, ()=>{
  console.log("backend connected")
});
