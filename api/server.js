const express = require("express")
const cors = require("cors")
const fs = require('fs');

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post("/write", function(req, res) {
  var id = req.query.id
  var value = req.query.value

  fs.readFile('secret.json', (err, data) => {
    if (err) throw err;
    let keys = JSON.parse(data);

    console.log(keys);
    keys.push({id: id, value: value})
    console.log(keys);
    fs.writeFile('secret.json', JSON.stringify(keys), (err, result) => {
        if (err) {
            return console.error(err)
        } else {
            console.log(result)
            console.log("Success")
            res.send("Success")
            return
        }
    })
  });
})

app.get("/read", function(req, res) {
  var id = req.query.id

  fs.readFile('secret.json', (err, data) => {
    if (err) throw err;
    let keys = JSON.parse(data);

    let result = {id: null, value: null}
    keys.forEach((value) => {
        if (value.id === id) {
            result = value
        }
    })

    res.send(result)
  });
})

app.listen(3001, () => {
  console.log("app listening on port 3001")
})