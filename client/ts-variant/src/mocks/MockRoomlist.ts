// A collection of mocking functionality for a the room list

import { ChatRoom, RequestError, RequestSuccess } from "../models/chatService";
import { ChatMessage } from "../models/generic";

function mockPost(message: ChatMessage) {
  console.log("Posting new message", message);

  return new Promise<RequestSuccess | RequestError>((resolve, reject) => {
    resolve({
      success: true,
      error: undefined,
    });

    reject({
      success: false,
      error: { message: "Failed posting message", error: "oh noes" },
    });
  });
}

function mockNewMessage(newMessage: ChatMessage) {
  console.log(newMessage);
}

export const mockList: ChatRoom[] = [
  {
    name: "common-room",
    isConnected: true,
    postMessage: (message: ChatMessage) => mockPost(message),
    onMessage: mockNewMessage,
  },
  {
    name: "kings-room",
    isConnected: true,
    postMessage: (message: ChatMessage) => mockPost(message),
    onMessage: mockNewMessage,
  },
  {
    name: "bastards-barracks",
    isConnected: false,
    postMessage: (message: ChatMessage) => mockPost(message),
    onMessage: mockNewMessage,
  },
];
