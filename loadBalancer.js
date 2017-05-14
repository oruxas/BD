
var arguments = process.argv.splice(2);
//PROXY
var http = require('http');
var httpProxy = require('http-proxy');

var seaport = require('seaport');
var ports = seaport.connect('localhost', 9090);


//currently hard coded with locations of each worker
// var addresses = [
//     {
//         host: '127.0.0.1',
//         port: 18071
//     },
//     {
//         host: '127.0.0.1',
//         port: 18072
//     }
// ]
var proxy = httpProxy.createProxyServer({});

var i = -1;
var server = http.createServer(function(req, res){

    //console.log(ports.query('server'));
    var addresses = ports.query('server');
    //console.log(ports.query('server'));
    if(!addresses.length){
        res.writeHead(503, {'Content-Type' : 'text/plain'});
        res.end('Service unavailable');
        return console.log('Service unavailable no workers');
        
    }
    i = (i + 1) % addresses.length;
    proxy.proxyRequest(req,res, {target: addresses[i]});
    
    //var target = addresses.shift();
    //proxy.web(req, res, {target});
    //addresses.push(target);
}).listen(arguments[0] || 18070, function(){
    console.log('proxy running');
});





//PROXY
//
//  Addresses to use in round robi n proxy
//
// var addresses = [
//     {
//         host: 'localhost',
//         port: 18071
//     },
//     {
//         host: 'localhost',
//         port: 18072
//      },
//     // {
//     //     host: 'localhost',
//     //     port: 18073
//     // }
// ]

// var i = 0; 
// httpProxy.createServer((req, res, proxy)=>{
//     proxy.web(req,res, {
//         target: 'http://localhost:18070'
//     });
//     proxy.proxyRequest(req, res, addresses[i]);
//     i = (i+1) % addresses.length;
// }).listen(arguments[0] || 18070, ()=>{
//     console.log('listening');
// });