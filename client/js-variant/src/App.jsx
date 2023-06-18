import "./index.css";
import "./App.css";

import { MenuBar } from "./components/MenuBar/MenuBar";
import { Chat } from "./components/Chat/Chat";

function App() {
  return (
    <div className="App">
      <MenuBar />

      <main>
        <Chat userAlias="Lars G" />
      </main>
    </div>
  );
}

export default App;
