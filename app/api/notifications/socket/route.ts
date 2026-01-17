import { initSocket } from "@/lib/socket";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { headers } = request;
  const upgradeHeader = headers.get("Upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return NextResponse.json(
      { error: "Expected a WebSocket request." },
      { status: 400 }
    );
  }

  const res = NextResponse.next();

  const io = initSocket(res.socket as any);

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return res;
}