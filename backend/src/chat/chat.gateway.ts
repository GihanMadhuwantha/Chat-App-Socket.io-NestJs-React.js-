import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { AuthService } from "../auth/auth.service";
import { UnauthorizedException } from "@nestjs/common";

@WebSocketGateway({
  cors: {
    origin: "http://localhost:3000", // Allow requests from your frontend origin
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private authService: AuthService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        throw new UnauthorizedException("No token provided");
      }
      // Verify the token
      const decoded = await this.authService.validateToken(token);
      client.data.user = decoded; // Save user data in client for further use
      console.log(`Client connected: ${client.id}`);
    } catch (error) {
      client.disconnect();
      console.log(`Client connection rejected: ${client.id}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(
    client: Socket,
    payload: { username: string; message: string }
  ) {
    this.server.emit("receiveMessage", payload);
  }

  afterInit(server: Server) {
    console.log("WebSocket Initialized");
  }
}
