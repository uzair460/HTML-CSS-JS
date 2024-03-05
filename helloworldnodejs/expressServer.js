const express = require('express')

const app = express()

app.get('/', function(req, res){
    res.send('hello world ussing the express js ')
}
)
app.listen(3000)

console.log ('server running at http://127.0.0.1:3000')