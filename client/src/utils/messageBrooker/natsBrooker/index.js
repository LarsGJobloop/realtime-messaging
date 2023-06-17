import { connectToNatsServer } from "./connectToNatsServer";
import { decodeMessage } from "./decodeMessage";
import { formatMessage } from "./formatMessage";

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

  connectToNatsServer(
    (connection) => {
      this_connection = connection;
      this_connection.subscribe(">", {
        callback: messageCallback,
      });

      sendMessage((message) => {
        const newMessage = formatMessage(message, roomMeta.userAlias);
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
