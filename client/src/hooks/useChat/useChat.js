import { useEffect, useState } from "react";
import { connect as connectToMessageBrooker } from "../../utils/messageBrooker";

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

    const { disconnect, connectionStatus } = connectToMessageBrooker({
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
