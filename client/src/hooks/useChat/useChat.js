import { useEffect, useState } from "react";
import messageBrooker from "../../utils/messageBrooker";

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
 *  error: {message: string, error: any} | null
 * }}
 */
export function useChat({ room, alias }) {
  // React hooks
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const [postMessage, setPostMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (isConnected || error !== null) return;

    const { disconnect, connectionStatus } = simplifiedConnect({
      errorHandler: setError,
      onNewMessage: handleNewMessage,
      sendMessage,
      roomMeta: {
        name: room,
        userAlias: alias,
      },
    });

    setIsConnected(connectionStatus);

    // When this chatroom gets unmounted disconnect from the server
    return () => disconnect();
  }, [room, alias]);

  // Event handlers
  /**
   * Updates messages with incomming ones
   */
  function handleNewMessage(error, message) {
    setError(error);

    setMessages((oldMessages) => {
      return [...oldMessages, message];
    });
  }

  /**
   * Sets the post message function
   */
  function sendMessage(callback) {
    setPostMessage(() => callback);
  }

  return {
    isConnected,
    messages,
    postMessage,
    error,
  };
}

import { StringCodec } from "nats.ws";

function decodeMessage(message) {
  const codec = StringCodec();
  return codec.decode(message);
}

/**
 * @typedef {{
 *  onNewMessage: (message: string) => void
 *  sendMessage: (message: string) => void
 *  errorHandler: (message: string, error, any) => void
 *  roomMeta: RoomMetaInformation
 * }} ChatRoomConnectionOptions
 */

/**
 * @typedef {{
 *    name: string
 *    userAlias: string
 *  }} RoomMetaInformation
 */

/**
 * Handles connecting to a message brooker and
 * exposes a selction of functionality
 *
 * @param {ChatRoomConnectionOptions} options
 *
 * @returns {{
 *  disconnect: () => void
 *  error: any
 *  connectionStatus: boolean
 * }}
 */
function simplifiedConnect(options) {
  const { errorHandler, onNewMessage, sendMessage, roomMeta } = options;

  let this_connection;

  function messageCallback(error, message) {
    if (error !== null) {
      console.error("??? NATS error", error);
    }

    const decodedMessage = decodeMessage(message.data);
    const parsedMessage = JSON.parse(decodedMessage);

    onNewMessage(error, parsedMessage);
  }

  messageBrooker.connect(
    (connection) => {
      this_connection = connection;
      this_connection.subscribe(">", {
        callback: messageCallback,
      });

      sendMessage((message) => {
        const newMessage = messageBrooker.formatMessage(
          message,
          roomMeta.userAlias
        );
        this_connection.publish(roomMeta.name, newMessage);
      });
    },
    (error) => errorHandler(error)
  );

  return {
    disconnect: () => {
      this_connection.close().catch((error) => console.error(error));
    },
    connectionStatus: this_connection ? true : false,
  };
}
