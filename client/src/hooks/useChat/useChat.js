import { mockMessages } from "./mockMessages";

import { useEffect, useState } from "react";
import { connect, StringCodec } from "nats.ws";

// NATs types
/**
 * @typedef {import("nats.ws").NatsConnection} NatsConnection
 */

/**
 * @typedef {NatsError} NatsError
 */

/**
 * @typedef {import("nats.ws").Msg} NatsMessage
 */

/**
 * TODO: Find out how to properly import type definition in JSDoc
 * 
 * @typedef {import("./mockMessages").ChatMessage} ChatMessage
 */

// NATS messages are byte arrays so we need a way to decode
// recieved messages and encode messages we want to send
// NATS includes a String Codec for this purpose
const natsCodec = StringCodec()

/**
 * Tries connecting to a NATS server
 *
 * @param {(connection: NatsConnection) => void} handleConnection
 * @param {({message: string, error}) => void} handleError
 */
async function connectToNatsServer(handleConnection, handleError) {
  try {
    const connection = await connect({
      servers: "ws://172.17.0.3:9090",
      tls: null
    });
    handleConnection(connection);
  } catch (error) {
    handleError({ message: "Error connecting", error });
  }
}

/**
 * Handles new messages from a NATS server
 *
 * @param {NatsError} error
 * @param {NatsMessage} message
 */
function handleNewMessage(error, message) {
  console.log("Message: ", natsCodec.decode(message.data));
  if (error) console.log("Error: ", error);
}

/**
 * 
 * @param {string} message
 * @param {string} author
 */
function formatMessage(message, author) {
  return JSON.stringify({
    id: `${new Date().toISOString()} ${author}`,
    body: message,
    author: author,
  })
}

/**
 * Returns a set of interactions and state of a ChatRoom Connection
 * 
 * @param {{
 *  room: string
 *  alias: string
 * }} options
 * @returns {{
 *  connected: boolean
 *  messages: ChatMessage[]
 *  postMessage: ((message: string) => void) | null
 *  error: any | null
 * }}
 */
export function useChat({room, alias}) {
  // React hooks
  const [connection, setConnection] = useState(null);
  const [error, setError] = useState(null);
  const [postMessage, setPostMessage] = useState(null);

  const messages = mockMessages;

  useEffect(() => {
    if(connection !== null || error !== null) return

    connectToNatsServer(
      (connection) => {
        setConnection(connection);
        connection.subscribe(">", { callback: handleNewMessage });

        // Since we want to store a function in useState,
        // We have to wrap that inside another function
        setPostMessage(
          () => (message) => connection.publish(room, natsCodec.encode(formatMessage(message, alias)))
        )
      },
      (error) => setError(error)
    );
    return () => {
      if (connection !== null) {
        connection.close()
          .catch(error => console.error(error))
      }
    };
  }, [room, alias]);

  // Derived State
  const connected = connection ? true : false;

  return {
    connected,
    messages,
    postMessage,
    error,
  };
}
