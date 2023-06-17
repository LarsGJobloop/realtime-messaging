import { StringCodec } from "nats.ws";

// NATs types
/**
 * @typedef {NatsError} NatsError
 */

/**
 * @typedef {import("nats.ws").Msg} NatsMessage
 */

// NATS messages are byte arrays so we need a way to decode
// recieved messages and encode messages we want to send
// NATS includes a String Codec for this purpose
const natsCodec = StringCodec();

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
