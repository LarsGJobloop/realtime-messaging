import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Routes
import { Lobby } from "./routes";
import { AddRoom } from "./routes/addRoom";
import { Admin } from "./routes/admin";
import { Login } from "./routes/login";
import { RoomLayout } from "./routes/room";
import { Room } from "./routes/room/:roomID";
import { createContext, useEffect, useState } from "react";
import { NatsConnection } from "nats.ws";
import { connect } from "./utilities/server";

export const connectionContext = createContext<NatsConnection | null>(null)

export default function App() {
  const [connection, setConnection] = useState<NatsConnection | null>(null)

  useEffect(() => {connect().then(setConnection)}, [])

  return (
    <connectionContext.Provider value={connection}>
      <Router>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/addRoom" element={<AddRoom />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />

          <Route path="/room" element={<RoomLayout />} >
            <Route path=":roomID" element={<Room />} />
          </Route>

          {/* Redirect invalid links to the landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </connectionContext.Provider>
  );
}
