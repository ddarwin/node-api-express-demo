const http = require('node:http');
const gremlin = require(`@gremlin/failure-flags`);

//create a server object:
http.createServer(async function (req, res) {

    console.log(process.env);

    await gremlin.invokeFailureFlag({
        name: 'hello-world-ingress',
        labels: { 
        method: req.method,
        path: req.path }});

    res.write('Hello DoubleD!'); //write a response to the client
    res.end(); //end the response
}).listen(8080); //the server object listens on port 8080
