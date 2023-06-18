export type User = {
  id: UserID,
  alias: string
}

export type ChatMessage = {
  id: MessageID,
  author: User,
  body: string,
  createdAt: DateTime,
};

export type UserID = string;
export type MessageID = string;
export type DateTime = string;

export type ErrorContainer = {message: string, error: any}