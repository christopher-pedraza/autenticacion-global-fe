import React, { useState, useEffect } from "react";
import frutas from "../images/frutas.jpg";
import alumnos from "../images/alumnos.jpg";

function InputArea2(props) {
    const [producto, setProducto] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");


    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [nombre, setNombre] = useState("");
    const [matricula, setMatricula] = useState("");


    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar si algún campo está vacío
        if (!correo || !contrasena || !nombre || !matricula) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        const Nombre = nombre;
        const Email = correo;
        const Id_Credencial = matricula;
        const Password = contrasena;

        try {
            const response = await fetch(
                "https://autenticacion-global-dreamlab.azurewebsites.net/api/user/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${props.tokenUsuario}`,
                    },
                    body: JSON.stringify({
                            Nombre,
                            Email,
                            Id_Credencial,
                            Password,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Error al agregar al usuario.");
            }

            // Limpiar los campos después de una respuesta exitosa
            setContrasena("");
            setCorreo("");
            setNombre("");
            setMatricula("");

            setError(""); // Limpiar el mensaje de error si hubo uno previamente
            setSuccessMessage("Agregado satisfactoriamente");

            // Establecer un temporizador para limpiar el mensaje después de 3 segundos
            setTimeout(() => {
                setSuccessMessage("");
                window.location.reload();
            }, 3000);
        } catch (error) {
            console.error("Error al agregar el producto:", error);
            // Podrías mostrar un mensaje de error aquí si lo deseas
        }
    };


     // Verifica si el usuario es un administrador
     const isAdmin = props.isAdmin;

    return (
        <section className="text-gray-600 body-font">
            <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 h-196">
                    <img
                        className="object-cover object-center rounded"
                        alt="hero"
                        src={alumnos}
                    />
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                    <h1 className="title-font sm:text-4xl text-3xl mb-1 font-medium text-gray-900">
                        Crear usuario
                    </h1>
                    <p className="mb-6 leading-relaxed">
                        Ingresa la información que se solicita.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <label
                                    htmlFor="producto"
                                    className="leading-7 text-sm text-gray-600"
                                >
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    id="producto"
                                    name="producto"
                                    value={nombre}
                                    onChange={(e) =>
                                        setNombre(e.target.value)
                                    }
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="p-2 w-full">
                                <label
                                    htmlFor="precio"
                                    className="leading-7 text-sm text-gray-600"
                                >
                                    Matrícula
                                </label>
                                <input
                                    type="text"
                                    id="precio"
                                    name="precio"
                                    value={matricula}
                                    onChange={(e) => setMatricula(e.target.value)}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="p-2 w-full">
                                <label
                                    htmlFor="descripcion"
                                    className="leading-7 text-sm text-gray-600"
                                >
                                    Correo electrónico
                                </label>
                                <input
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    value={correo}
                                    onChange={(e) =>
                                        setCorreo(e.target.value)
                                    }
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="p-2 w-full">
                                <label
                                    htmlFor="descripcion"
                                    className="leading-7 text-sm text-gray-600"
                                >
                                    Contraseña
                                </label>
                                <input
                                    type="text"
                                    id="descripcion"
                                    name="descripcion"
                                    value={contrasena}
                                    onChange={(e) =>
                                        setContrasena(e.target.value)
                                    }
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:bg-transparent focus:border-blue-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="p-2 w-full">
                                <button
                                    type="submit"
                                    className="flex justify-center items-center text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg w-full font-light mx-auto"
                                >
                                    Agregar
                                </button>
                                {successMessage && (
                                    <p className="text-green-500 text-sm mt-1">
                                        {successMessage}
                                    </p>
                                )}
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default InputArea2;
