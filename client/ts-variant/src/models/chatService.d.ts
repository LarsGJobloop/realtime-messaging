export type ChatServerRequest<T = true> = Promise<
  RequestSuccess<T> | RequestError
>;
export type RequestSuccess<T = true> = { success: T; error?: ErrorContainer };
export type RequestError = { success: false; error: ErrorContainer };

export type RoomName = string;
export type ServerID = string;
export type ServerURL = `ws://${string}:${number}`;

export interface ChatRoom {
  name: RoomName;
  isConnected: boolean;
  postMessage: (message: ChatMessage) => ChatServerRequest;
  onMessage: (newMessage: ChatMessage) => void;
}

export interface ChatServer {
  id: ServerID;
  subscriptions: ChatRoom[];
  subscribe: (roomName: RoomName) => ChatServerRequest<ChatRoom>;
  unsubscribe: (roomName: RoomName) => void;
}

export interface ChatService {
  isConnected: boolean;
  serverList: ChatServer[];
  connect: (serverURL: ServerURL) => ChatServerRequest<ChatServer>;
  disconnect: () => void;
}
