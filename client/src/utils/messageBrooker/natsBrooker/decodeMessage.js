import { StringCodec } from "nats.ws";

const codec = StringCodec();

/**
 * Decodes an array into a string
 *
 * @param {Uint8Array} message
 * @returns
 */
export function decodeMessage(message) {
  return codec.decode(message);
}
