import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chats from "./Chats";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chats />} />
      </Routes>
    </Router>
  );
}

export default App;
