let http = require("http")


 http.createServer(function(req, res){

    res.writehead({'200, content-type' : 'text/plain'})
    res.end("hello world!")

 }).listen(8081);

 console.log('server running at http://127.0.0.1:8081/')