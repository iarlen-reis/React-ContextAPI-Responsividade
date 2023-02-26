import "./App.css";
import React, { useState, useEffect } from "react";

// hooks
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import { useGetLocalStorage } from "./hooks/useLocalStorage";

// pages
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
// components
import NavBar from "./components/NavBar/NavBar";

function App() {
  // Criando os valores para passar no provider
  const [emailUser, setEmailUser] = useState(undefined);
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");

  // puxando o usuário e estado dele no localstorage:
  useEffect(() => {
    const { username, email, auth } = useGetLocalStorage("user");

    console.log(email, auth);

    setEmailUser(email);
    setAuth(auth);
  }, [emailUser]);

  return (
    <div className="App">
      {/* Definindo provider e os valores */}
      <AuthProvider
        value={{
          emailUser,
          setEmailUser,
          auth,
          setAuth,
          username,
          setUsername,
        }}
      >
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route
                path="/login"
                element={!auth ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/"
                element={auth ? <Home /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
