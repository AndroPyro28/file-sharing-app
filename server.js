import {createServer} from "node:http"
import next from 'next'
import { Server } from "socket.io"

const dev = process.env.NODE_ENV !== "production"
const hostname = process.env.HOSTNAME || "localhost"
const port = parseInt(process.env.PORT || "3000", 10)

const app = next({dev, hostname, port})

const handler = app.getRequestHandler();

app.prepare()
.then(() => {
    const httpServer = createServer(handler)

    const io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log('connected')
    })

    httpServer.listen(port, () => {
        console.log(`Server listening on http://${hostname}:${port}`)
    })
})