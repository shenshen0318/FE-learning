// 1. 导入相关的模块
const http= require('http'),
      fs= require('fs')

// 2. 创建一个实例
const server= http.createServer(function(request, response){
    let url= request.url;
    
  // 获得HTTP请求的 method 和 url:
    console.log(request.method + ': ' + request.url);
    
    if(url === '/'){
        fs.readFile('./form.html',function(err, data){
            if(!err){
                response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                response.end(data);
            }else{
                throw err;
            }
        })
    }else if(url === '/index'){
        fs.readFile('./index.html',function(err, data){
            if(!err){
                response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
                response.end(data);
            }else{
                throw err;
            }
        })
    }else if(url === '/data'){
        fs.readFile('./data.json', function(err, data){
            if(!err){
                response.writeHead(200, {"Content-Type": "text/json;charset=UTF-8"});
                response.end(data);
            }else{
                throw err;
            }
        })
    }else if(url === '/form'){
        fs.readFile('./form.json', function(err, data){
            if(!err){
                response.writeHead(200, {"Content-Type": "text/json;charset=UTF-8"});
                response.end(data);
            }else{
                throw err;
            }
        })
    }else{
        console.log("err");
    }
    
});

// 监听端口
server.listen(8000);   
console.log("server is running at http://127.0.0.1:8000");
