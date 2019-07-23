const http = require('http')
const fs = require('fs')
const httpPort = 8080

http.createServer((req, res) => {
    // console.log(req);
    // if (req.url.startsWith('/static/js')||req.url.startsWith('/static/css')) 
    // {
    //     fs.readFile('.' + req.url,(err,data)=>{
    //         console.log(data);
    //         res.end(data);
    //     })    
    //     return;
    // }


    fs.readFile('06-vue-router-history.html', 'utf-8', (err, content) => {
        if (err) {
            console.log('We cannot open "index.html" file.')
        }

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'

        })

        res.end(content)
    })
}).listen(httpPort, () => {
    console.log('Server listening on: http://localhost:%s', httpPort)
})