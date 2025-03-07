## Create a server using http

    /* Create a server using http*/

1.  const server=http.createServer(app);
2.  server.listen(3000,()=>{ })

    # By default, Express.js also creates an HTTP server internally when you use app.listen(), but sometimes you might need more control over how the server handles requests. So we use server.listen(PORT,()=>{})

    # http module -> handles "lower-level network details"

    ## we mean that it directly interacts with the TCP/IP protocol. It allows control over request handling before Express processes them.Normally, when you use app.listen(3000), Express handles everything for you. But when you use createServer(app), you get more control over how requests and responses work.

    ## app.listen() is simpler but does not allow WebSockets or advanced control.If you need real-time communication (like chat apps) or want to handle raw HTTP requests, use createServer(app). Otherwise, app.listen() is enough.

##

## Next Next

##

1. # const socket = require("socket.io");

2. # const initalizeSocket = (server) => {}

# By default, browsers block WebSocket connections from different domains
# (e.g., your backend is on localhost:3000, but React runs on localhost:5173).
# This CORS setting allows the frontend to communicate with the WebSocket server

3. # const io = new socket.Server(server, {cors: { origin: "http:#localhost:5173", methods: ["GET", "POST"] },});

# io.on("connection", callback) method is used to detect
# when a new user (client) connects to the WebSocket server.

4. # io.on("connection", (socket) => {})

# socket represents the connected client

5. # console.log("A new user connected with socketId : ", socket.id, socket);


