import { encodeMessage, decodeMessage } from "./codec";
import { connectToNatsServer } from "./connectToNatsServer";

/**
 * @typedef {import("../../../hooks/useChat/useChat").ChatMessage} ChatMessage
 */

/**
 * @typedef {{
 *  onNewMessage: (message: ChatMessage, error) => void
 *  sendMessage: (message: string) => void
 *  onError: (message: string, error, any) => void
 *  roomMeta: RoomMetaInformation
 * }} ChatRoomConnectionOptions
 */
/**
 * @typedef {{
 *    name: string
 *    NatsConnection,
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
export function connect(options) {
  const { onError, onNewMessage, sendMessage, roomMeta } = options;

  let serverConnection;

  connectToNatsServer(
    (connection) => {
      serverConnection = connection;
      serverConnection.subscribe(roomMeta.name, {
        callback: handleIncommingMessages,
      });

      sendMessage((message) => {
        const newMessage = encodeMessage(message, roomMeta.userAlias);        
        serverConnection.publish(roomMeta.name, newMessage);
      });
    },
    (error) => onError(error)
  );

  // Derived values
  // TODO: gets set to early and does not update
  // probably better to handle with a callback
  const connectionStatus = serverConnection ? true : false

  // Functions
  function handleIncommingMessages(error, message) {
    if (error !== null) {
      console.error("??? NATS error", error);
      onNewMessage(null, error);
    }

    const newMessage = decodeMessage(message.data);
    console.log(newMessage)

    onNewMessage(newMessage, null);
  }

  function disconnect() {
    if (!serverConnection) return
    serverConnection.close().catch((error) => console.error(error));
  }

  return {
    disconnect,
    connectionStatus,
  };
}
