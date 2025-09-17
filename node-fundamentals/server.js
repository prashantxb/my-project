const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  res.statusCode = 200; // success status
  res.setHeader('Content-Type', 'text/plain'); 
  res.end('Hello, World!\n'); // response to browser
});

// Define port
const port = 3000;

// Start server
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
