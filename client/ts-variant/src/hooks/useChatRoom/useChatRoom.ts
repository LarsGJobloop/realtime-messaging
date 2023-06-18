import { useContext, useEffect, useState } from "react";
import { connectionContext } from "../../contexts/ConnectionContext";
import { Msg, NatsError, StringCodec } from "nats.ws";
import { ChatMessage } from "../../models/generic";

const codec = StringCodec();

interface IuseChatRoom {
  roomID: string | undefined;
  onNewMessage: (error: NatsError | null, message: Msg) => void;
}

export function useChatRoom({ roomID, onNewMessage }: IuseChatRoom) {
  const connection = useContext(connectionContext);
  const [sendMessage, setSendMessage] = useState<
    ((message: ChatMessage) => void) | null
  >(null);

  useEffect(() => {
    if (!roomID || !connection) return;

    const subscription = connection.subscribe(roomID, {
      callback: onNewMessage,
    });

    setSendMessage(
      () => (message: ChatMessage) =>
        connection.publish(roomID, codec.encode(JSON.stringify(message)))
    );

    return () => subscription.unsubscribe();
  }, [roomID]);

  return {
    sendMessage,
  };
}
