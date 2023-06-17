import { StringCodec } from "nats.ws";

// NATS messages are byte arrays so we need a way to decode
// recieved messages and encode messages we want to send
// NATS includes a String Codec for this purpose
const natsCodec = StringCodec();

/**
 * Formats Messages into Uint8Arrays
 *
 * @param {string} message
 * @param {string} alias
 */
export function formatMessage(message, alias) {
  const messageString = JSON.stringify({
    id: `${new Date().toISOString()} ${alias}`,
    body: message,
    author: { alias },
  });

  return natsCodec.encode(messageString);
}
