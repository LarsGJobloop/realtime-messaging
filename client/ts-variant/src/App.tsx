import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Routes
import { Lobby } from "./routes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />}>
          <Route path="login" element={<h1>Login</h1>} />
          <Route path="room" element={<h1>Room</h1>} />
          <Route path="addRoom" element={<h1>Add new Room</h1>} />
          <Route path="admin" element={<h1>Admin Page</h1>} />
        </Route>

        {/* Redirect invalid links to the landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
