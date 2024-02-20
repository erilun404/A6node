const http = require('node:http')
const url = require(`url`)
const fs = require(`fs`);


// fs.writeFile("hobbies.txt", "What i like:", (err) => {
//     if(err) throw err;
//     console.log("file saved")
// });

http.createServer((req,res)=>{
    res.writeHead(200, "all is working", {"Content-type" : "text/html"}); //behövs bara användas på ett ställ i koden
    console.log(url.parse(req.url,true).path)
    if(url.parse(req.url,true).pathname === `/about`){
        let queries = url.parse(req.url,true).query //här får vi in aboutpage
        if(queries.hobbies === `coding`) {
            res.write(queries.hobbies)
            console.log('Här gör vi res.write(queries.coding)')
        
            fs.readFile(`coding.txt`, (err, data) => {
                res.write(data)
                console.log('Här gör vi res.end(hobbies.txt)')
                console.log(data)
            })
        }else if (queries.hobbies === `photo`) {
            res.write(queries.hobbies)
            console.log('Här gör vi res.end(queries.photo)')
            
            fs.readFile(`photo.txt`, (err, data) => {
                res.write(data)
                console.log('Här gör vi res.end(photo.txt)')
            })
        }else{
            res.end(`default`)
        }
       
    }else if(req.url === `/flower`){
        fs.readFile(`index.html`, (err, data) => {
            res.end(data)
            console.log(data)
            console.log(`reading data from html`)
        })
        
    }else if(req.url === `/galaxblomma.jpg`){
        fs.readFile(`galaxblomma.jpg`, (err, data) => {
            res.end(data)
            console.log(`reading img`)
        })
    } else if(req.url === `/music`) {
        fs.readFile(`music.html`, (err, data) => {
            res.end(data)
            console.log("reading data from music.html")
        })
    }
    // else if(req.url === `/coding-image.jpg`){
    //     fs.readFile(`coding-image.jpg`, (err, data) => {
    //         res.end(data)
    //     })
    // }
    
    else{
        res.write("<h1>This is a default message</h1>" + "<p>Search for:</p>" + "<p>/about?hobbies=coding, /about?hobbies=photo</p>"
        + "<p>/flower or /music</p>")
        res.end(`I am the default page `)
    }
    
   //res.end();
}).listen(3030, ()=>console.log("server listen"))



