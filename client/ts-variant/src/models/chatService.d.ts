export type ChatServerRequest<T = true> = Promise<RequestSuccess<T> | RequestError>;
export type RequestSuccess<T = true> = { success: T; error?: ErrorContainer };
export type RequestError = { success: false; error: ErrorContainer };

export type RoomName = string;
export type ServerName = string;

export interface ChatRoom {
  name: RoomName;
  isConnected: boolean;
  postMessage: (message: ChatMessage) => ChatServerRequest;
  onMessage: (newMessage: ChatMessage) => void;
}

export interface ChatServer {
  name: ServerName;
  subscriptions: ChatRoom[];
  subscribe: (roomName: RoomName) => ChatServerRequest<ChatRoom>;
  unsubscribe: (roomName: RoomName) => void;
}

export interface ChatService {
  isConnected: boolean;
  serverList: ChatServer[];
  connect: () => ChatServerRequest<ChatServer>;
  disconnect: () => void;
}
