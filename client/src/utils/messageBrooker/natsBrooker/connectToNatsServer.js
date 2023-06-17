import { connect } from "nats.ws";

// ENVIRONMENT VARIABLES
const SERVER = import.meta.env.VITE_MESSAGE_BROOKER_URL;
const PORT = import.meta.env.VITE_MESSAGE_BROOKER_CLIENT_PORT;

/**
 * @typedef {import("nats.ws").NatsConnection} NatsConnection
 */

/**
 * Tries connecting to a NATS server
 *
 * @param {(connection: NatsConnection) => void} handleConnection
 * @param {({message: string, error}) => void} handleError
 */
export async function connectToNatsServer(handleConnection, handleError) {
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
