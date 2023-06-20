export type RoomID = string;
export type ServerID = string;
export type ServerURL = `ws://${string}:${number}`;

export interface ChatRoom {
  id: RoomID;
  name: string;
}
