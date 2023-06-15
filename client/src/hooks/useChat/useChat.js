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

/**
 * @typedef {{
 *  id: string
 *  author: {alias: string},
 *  body: string,
 *  createdAt: UTCString,
 * }} ChatMessage
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
 * @param {() => void} addMessage
 */
function handleNewMessage(error, message, addMessage) {
  const newMessage = JSON.parse(natsCodec.decode(message.data))

  if (error !== null) {
    console.log("Error: ", error);
    return
  };
  
  addMessage(
    (currentMessages) => [...currentMessages, newMessage]
  )
}

/**
 * Formats messages into Message model JSON strings
 * 
 * @param {string} message
 * @param {string} alias
 */
function formatMessage(message, alias) {
  return JSON.stringify({
    id: `${new Date().toISOString()} ${alias}`,
    body: message,
    author: {alias},
  })
}

/**
 * Returns a set of interactions and the state of a ChatRoom
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
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if(connection !== null || error !== null) return

    connectToNatsServer(
      (connection) => {
        setConnection(connection);
        connection.subscribe(">", { callback: (error, message) => handleNewMessage(error, message, setMessages) });

        // Since we want to store a function in useState,
        // We have to wrap that inside another function
        setPostMessage(
          () => (message) => connection.publish(room, natsCodec.encode(formatMessage(message, alias)))
        )
      },
      (error) => setError(error)
    );

    // When this hook gets unmounted cleanup after ourself
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
