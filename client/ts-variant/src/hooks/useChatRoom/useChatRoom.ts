import { useContext, useEffect, useState } from "react";
import { connectionContext } from "../../contexts/ConnectionContext";
import { Msg, NatsError, StringCodec } from "nats.ws";
import { ChatMessage } from "../../models/generic";

const codec = StringCodec();

interface IuseChatRoom {
  roomID: string | undefined;
}

export function useChatRoom({ roomID }: IuseChatRoom) {
  const connection = useContext(connectionContext);
  const [sendMessage, setSendMessage] = useState<
    ((message: ChatMessage) => void) | null
  >(null);
  const [messages, updateMessages] = useState<ChatMessage[]>([]);

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

  return {
    sendMessage,
    messages,
  };
}
