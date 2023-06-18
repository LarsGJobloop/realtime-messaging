import style from "./style.module.css";

import { useParams } from "react-router-dom";
import { useState } from "react";

import { ChatMessage } from "../../../models/generic";

import { Msg, NatsError } from "nats.ws";

import { ChatInput } from "../../../components/ChatInput/ChatInput";
import { ChatFeed } from "../../../components/ChatFeed/ChatFeed";
import { useChatRoom } from "../../../hooks/useChatRoom/useChatRoom";

export function Room() {
  const { roomID } = useParams();
  const [messages, updateMessages] = useState<ChatMessage[]>([]);
  const { sendMessage } = useChatRoom({
    roomID,
    onNewMessage: handleNewMessage,
  });

  function handleNewMessage(error: NatsError | null, message: Msg) {
    if (error) return;

    const newMessage = message.json() as ChatMessage;

    updateMessages((currentMessages) => [...currentMessages, newMessage]);
  }

  return (
    <div className={style["Room"]}>
      <header>
        <h1>{roomID}</h1>
      </header>

      <main>
        <ChatFeed messages={messages} />
      </main>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}
