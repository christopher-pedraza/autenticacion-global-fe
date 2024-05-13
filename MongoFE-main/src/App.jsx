import { useState, useEffect } from "react";
import "./App.css";
import Notification from "./components/Notificactions";
import InputArea from "./InputArea";
import ListArea from "./ListArea";
import loginService from "./services/login";
import imagenCanasta from "./images/Picture2.svg";
import NavBar from "./components/NavBar";
import InputArea2 from "./components/InputArea2";
import Product from "./components/Product";
import TablaProductos from "./components/TablaProductos";
import userPicture from "../src/images/userpicture.png";

//Listado temporal de productos
const productos = [
  {
    id: 1,
    producto: "Microprocesador i3",
    precio: 120,
  },
];

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user); // Establece el usuario completo en lugar del token
    }
  }, []);
  
  

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedAppUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Creedenciales incorrectas");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const productsForm = () => (
    <div className="container mt-5">
      <ListArea productos={productos} />
      <InputArea productos={productos} />
    </div>
  );
  
  const loginForm = () => {
    return (

      
      
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={userPicture}

            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Administrador
          </h2>
          <h3 className="text-center text-lg font-light tracking-tight text-gray-900">
            Inicio de sesión
          </h3>
        </div>
  
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Usuario
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
  
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
        <Notification mensaje={errorMessage} />

      </div>
    );
  };
  
  return (
    <>
      <div className="h-screen">
        <NavBar 
          nombrePagina="Administrador"
          nombreUsuario={user ? user.name : ""}
        />
        <InputArea2 
          tokenUsuario={user ? user.token : ""}
          isAdmin={user ? user.rol : ""}
        />
        <div className="h-1 bg-gray-50 my-0 rounded overflow-hidden"></div>
  
        <TablaProductos
          isAdmin={user ? user.rol : ""}
        />
  
        <div className="w-full h-px bg-blue-500 min-h-10 pr-10 pt-2 text-white text-right">
          CodeCraft Solutions
        </div>
      </div>
    </>
  );
    
}

export default App;
