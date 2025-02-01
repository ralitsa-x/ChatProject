import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NoAuthGuard from "./guards/NoAuthGuard";
import AuthGuard from "./guards/AuthGuard";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { IdentityProvider } from "./utils/IdentityContext";

function App() {
  return (
    <IdentityProvider>
      <Router>
        <div className="App">
          <Main>
            <Routes style={{ overflowX: "hidden", minHeight: "100vh" }}>
              <Route path="/" element={<AuthGuard><Home /></AuthGuard>} />
              <Route path="/login" element={<NoAuthGuard><Login /></NoAuthGuard>} />
              <Route path="/register" element={<NoAuthGuard><Register /></NoAuthGuard>} />
            </Routes>
          </Main>
        </div>
      </Router>
    </IdentityProvider>
  );
}

export default App;