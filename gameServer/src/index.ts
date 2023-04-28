import { Server } from "colyseus";
import http from "http";
import express from "express"
import { FourPlayerRoom } from "./room/FourPlayerRoom";

const port = Number(process.env.PORT) || 2567;
const app = express();

// 创建 HTTP 服务器
const server = http.createServer(app);

// 创建 Colyseus 服务器
const gameServer = new Server({
  server: server,
});

// 在此处添加房间和其他逻辑
gameServer.define("four_player_room", FourPlayerRoom);
// 监听指定端口
gameServer.listen(port);
console.log(`Server is listening on http://localhost:${port}`);
