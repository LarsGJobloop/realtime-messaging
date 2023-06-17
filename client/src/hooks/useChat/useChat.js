import { useEffect, useState } from "react";
import { connect, StringCodec } from "nats.ws";

// ENVIRONMENT VARIABLES
const SERVER = import.meta.env.VITE_MESSAGE_BROOKER_URL
const PORT = import.meta.env.VITE_MESSAGE_BROOKER_CLIENT_PORT

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

// Our types
/**
 * @typedef {{
 *  alias: string
 * }} User
 */

/**
 * @typedef {{
 *  id: UniqueID
 *  author: User
 *  body: string
 *  createdAt: DateTime
 * }} ChatMessage
 */

// NATS messages are byte arrays so we need a way to decode
// recieved messages and encode messages we want to send
// NATS includes a String Codec for this purpose
const natsCodec = StringCodec();

/**
 * Tries connecting to a NATS server
 *
 * @param {(connection: NatsConnection) => void} handleConnection
 * @param {({message: string, error}) => void} handleError
 */
async function connectToNatsServer(handleConnection, handleError) {
  try {
    const connection = await connect({
      servers: `ws://${SERVER}:${PORT}`,
      tls: null,
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
 * @param {() => void} addMessage
 */
function handleNewMessage(error, message, addMessage) {
  const newMessage = JSON.parse(natsCodec.decode(message.data));

  if (error !== null) {
    console.log("Error: ", error);
    return;
  }

  addMessage((currentMessages) => [...currentMessages, newMessage]);
}

/**
 * Formats Messages into Uint8Arrays
 *
 * @param {string} message
 * @param {string} alias
 */
function formatMessage(message, alias) {
  const messageString = JSON.stringify({
    id: `${new Date().toISOString()} ${alias}`,
    body: message,
    author: { alias },
  });

  return natsCodec.encode(messageString);
}

/**
 * Returns a set of interactions and the state of a ChatRoom
 *
 * @param {{
 *  room: string
 *  alias: string
 * }} options
 * @returns {{
 *  isConnected: boolean
 *  messages: ChatMessage[]
 *  postMessage: ((message: string) => void) | null
 *  error: any | null
 * }}
 */
export function useChat({ room, alias }) {
  // React hooks
  const [connection, setConnection] = useState(null);
  const [error, setError] = useState(null);
  const [postMessage, setPostMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (connection !== null || error !== null) return;

    connectToNatsServer(
      (connection) => {
        setConnection(connection);
        connection.subscribe(">", {
          callback: (error, message) =>
            handleNewMessage(error, message, setMessages),
        });

        // Since we want to store a function in useState,
        // We have to wrap that inside the state setter function
        setPostMessage(
          () => (message) => connection.publish(room, formatMessage(message, alias))
        );
      },
      (error) => setError(error)
    );

    // When this chatroom gets unmounted disconnect from the server
    return () => {
      if (connection !== null) {
        connection.close().catch((error) => console.error(error));
      }
    };
  }, [room, alias]);

  // Derived State
  const isConnected = connection ? true : false;

  return {
    isConnected,
    messages,
    postMessage,
    error,
  };
}
