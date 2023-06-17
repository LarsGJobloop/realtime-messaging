import { connectToNatsServer } from "./connectToNatsServer";
import { decodeMessage } from "./decodeMessage";
import { formatMessage } from "./formatMessage";

/**
 * @typedef {{
 *  onNewMessage: (message: string, error) => void
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
        callback: onNewMessage,
      });

      sendMessage((message) => {
        const newMessage = formatMessage(message, roomMeta.userAlias);
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
  function onNewMessage(error, message) {
    if (error !== null) {
      console.error("??? NATS error", error);
      onNewMessage(null, error);
    }

    const decodedMessage = decodeMessage(message.data);
    const parsedMessage = JSON.parse(decodedMessage);

    onNewMessage(parsedMessage, null);
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
