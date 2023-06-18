import { StringCodec } from "nats.ws";

const codec = StringCodec();

/**
 * @typedef {import("../../../hooks/useChat/useChat").ChatMessage} ChatMessage
 */

/**
 * Decodes an array into a string
 *
 * @param {Uint8Array} message
 * @returns {ChatMessage}
 */
export function decodeMessage(message) {
  const decoded = codec.decode(message);
  const messageObject = JSON.parse(decoded)

  return messageObject
}

/**
 * Formats Messages into Uint8Arrays
 *
 * @param {string} message
 * @param {string} alias
 * 
 * @returns {Uint8Array}
 */
export function encodeMessage(message, alias) {
  const messageString = JSON.stringify({
    id: `${new Date().toISOString()} ${alias}`,
    body: message,
    author: { alias },
  });

  return codec.encode(messageString);
}
