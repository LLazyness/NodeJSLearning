const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
   const url = req.url;
   const method = req.method;
   if (url === '/') {
      res.write(`<html><body><form action="/message" method="POST"><input type="text" name="message" /><input type="submit" /></form></body></html>`);
      res.end();
      return
   }

   if (url === '/hello') {
      res.setHeader('Content-Type', 'text/html');
      res.write(`<html>${res.message}`);
      res.write('</html>');
      res.end();
      return;
   }

   if (url === '/message' && method === 'POST') {
      const body = [];

      req.on('data', (chunk) => {
         body.push(chunk);
      });

      return req.on('end', () => {
         const parsedBody = Buffer.concat(body).toString();
         const message = parsedBody.split('=')[1];
         fs.writeFile('message.txt', message, () => {
            res.statusCode = 302;
            res.setHeader('Location', '/hello');
            return res.end();
         });
      })
   }

   res.setHeader('Content-Type', 'text/html');
   res.write(`<html>${res.message}`);
   res.write('</html>');
   res.end();
});

server.listen(3000);