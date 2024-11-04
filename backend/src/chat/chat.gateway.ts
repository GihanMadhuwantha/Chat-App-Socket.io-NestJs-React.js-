import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { ChatService } from "./chat.service";

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // Allow requests from your frontend origin
    credentials: true,               // Enable credentials if needed
  },
})

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  afterInit(server: Server) {
    console.log("WebSocket Initialized");
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(
    client: Socket,
    payload: { username: string; message: string }
  ) {
    // You can save the message to a database using chatService here
    this.server.emit("receiveMessage", payload); // Broadcast the message to all clients
  }
}
