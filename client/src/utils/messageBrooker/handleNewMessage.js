import { natsCodec } from "../../hooks/useChat/useChat";

/**
 * Handles new messages from a NATS server
 *
 * @param {NatsError} error
 * @param {NatsMessage} message
 * @param {() => void} addMessage
 */
export function handleNewMessage(error, message, addMessage) {
  const newMessage = JSON.parse(natsCodec.decode(message.data));

  if (error !== null) {
    console.log("Error: ", error);
    return;
  }

  addMessage((currentMessages) => [...currentMessages, newMessage]);
}
