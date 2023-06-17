import { useEffect, useState } from "react";
import messageBrooker from '../../utils/messageBrooker'

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
 *  error: any | null
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

    const {disconnect, connectionStatus} = simplifyiedConnection(setMessages, setPostMessage, room, alias, setError);

    setIsConnected(connectionStatus)

    // When this chatroom gets unmounted disconnect from the server
    return () => disconnect();
  }, [room, alias]);

  return {
    isConnected,
    messages,
    postMessage,
    error,
  };
}

/**
 * Connects to a message brooker and returns:
 * - something that gets triggered by new messages
 * - way to disconnect
 * - any errors that might occur
 * - a way to post new messages
 * - the status of the connection
 * 
 * @param {*} setMessages 
 * @param {*} setPostMessage 
 * @param {string} room 
 * @param {string} alias 
 * @param {*} setError 
 * 
 * @returns {{
 *  eventCallback: (message: ChatMessage) => void
 *  disconnect: () => void
 *  error: any
 *  postmessage: (message: ChatMessage) => void
 *  connectionStatus: boolean
 * }}
 */
function simplifyiedConnection(setMessages, setPostMessage, room, alias, setError) {
  let this_connection;

  messageBrooker.connect(
    (connection) => {
      this_connection = connection;
      this_connection.subscribe(">", {
        callback: (error, message) => messageBrooker.handleNewMessage(error, message, setMessages),
      });

      // Since we want to store a function in useState,
      // We have to wrap that inside the state setter function
      setPostMessage(
        () => (message) => this_connection.publish(room, messageBrooker.formatMessage(message, alias))
      );
    },
    (error) => setError(error)
  );

  return {
    disconnect: () => {this_connection.close().catch((error) => console.error(error));},
    connectionStatus: this_connection ? true : false
  }
}

