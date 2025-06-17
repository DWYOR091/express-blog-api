const app = require('./app');
const http = require('http');
const { port } = require('./config/kyes')

const server = http.createServer(app)

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
