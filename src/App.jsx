import "./App.css";
import React, { useState, useEffect } from "react";

// hooks
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { useAuthContext } from "./contexts/authContext";

// pages
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
// components
import NavBar from "./components/NavBar/NavBar";

function App() {
  // Criando os valores para passar no provider
  const [user, setUser] = useState(undefined);
  const [authorization, setAuthorization] = useState(undefined);

  // puxando o usuário e estado dele no localstorage:
  useEffect(() => {
    setUser(localStorage.getItem("user"));
    setAuthorization(localStorage.getItem("logado"));
  }, [user, authorization]);

  return (
    <div className="App">
      {/* Definindo provider e os valores */}
      <AuthProvider value={{ user, setUser, setAuthorization }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
