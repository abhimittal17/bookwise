import { Server as IOServer } from "socket.io";
import type { NextApiResponse } from "next";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";

type SocketServer = HTTPServer & {
  io?: IOServer;
};

type SocketWithIO = NetSocket & {
  server: SocketServer;
};

type NextApiResponseWithSocket = NextApiResponse & {
  socket: SocketWithIO;
};

let io: IOServer | null = null;

export const initSocket = (res: NextApiResponseWithSocket) => {
  if (!io) {
    io = new IOServer(res.socket.server, {
      path: "/api/notifications/socket",
    });

    res.socket.server.io = io;
  }

  return io;
};
