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
import { Room } from "./routes/room";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/addRoom" element={<AddRoom />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room" element={<Room />} />

        {/* Redirect invalid links to the landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
