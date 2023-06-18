export type ChatServreRequest<T = true> = Promise<RequestSuccess<T> | RequestError>;
export type RequestSuccess<T = true> = { success: T; error?: ErrorContainer };
export type RequestError = { success: false; error: ErrorContainer };

export type RoomName = string;

export interface ChatRoom {
  name: RoomName;
  isConnected: boolean;
  postMessage: (message: ChatMessage) => ChatServreRequest;
  onMessage: (newMessage: ChatMessage) => void;
}

export interface ChatServer {
  subscriptions: ChatRoom[];
  subscribe: (roomName: RoomName) => ChatServreRequest<ChatRoom>;
  unsubscribe: (roomName: RoomName) => void;
}

export interface ChatService {
  isConnected: boolean;
  connect: () => ChatServreRequest<ChatServer>;
  disconnect: () => void;
}
