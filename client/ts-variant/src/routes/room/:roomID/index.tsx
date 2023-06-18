import style from "./style.module.css";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { ChatMessage } from "../../../models/generic";

import { connectionContext } from "../../../contexts/ConnectionContext";

import { Msg, NatsError, StringCodec } from "nats.ws";
import { ChatInput } from "../../../components/ChatInput/ChatInput";

const codec = StringCodec();

export function Room() {
  const { roomID } = useParams();
  const connection = useContext(connectionContext);

  const [messages, updateMessages] = useState<ChatMessage[]>([]);
  const [sendMessage, setSendMessage] = useState<
    ((message: ChatMessage) => void) | null
  >(null);

  useEffect(() => {
    if (!roomID || !connection) return;

    const subscription = connection.subscribe(roomID, {
      callback: handleNewMessage,
    });
    setSendMessage(
      () => (message: ChatMessage) =>
        connection.publish(roomID, codec.encode(JSON.stringify(message)))
    );

    return () => subscription.unsubscribe();
  }, [roomID]);

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
        <ul>
          {messages.map((message) => {
            return (
              <li key={message.id}>
                <MessageFeedCard message={message} />
              </li>
            );
          })}
        </ul>
      </main>

      <ChatInput sendMessage={sendMessage} />
    </div>
  );
}

interface MessageFeedCardProps {
  message: ChatMessage;
}

function MessageFeedCard({ message }: MessageFeedCardProps) {
  return <div>{message.body}</div>;
}
