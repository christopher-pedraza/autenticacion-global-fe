import React, { useEffect, useState } from "react";
import axios from "axios";
import supermercado from "../images/supermercado2.jpg";

function TablaProductos(props) {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const isAdmin = props.isAdmin;

    useEffect(() => {
        // Realizar una solicitud GET para obtener los productos de tu base de datos
        axios
            .get(
                "https://autenticacion-global-dreamlab.azurewebsites.net/api/user"
            )
            .then((response) => {
                setProducts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleDelete = (productId) => {
        // Realizar una solicitud DELETE para eliminar el producto de la base de datos
        axios
            .delete(
                `https://autenticacion-global-dreamlab.azurewebsites.net/api/user/${productId}`
            )
            .then(() => {
                // Actualizar el estado eliminando el producto de la lista
                setProducts(
                    products.filter((product) => product.id !== productId)
                );
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
            });
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleSave = () => {
        // Realizar una solicitud PUT para actualizar el producto en la base de datos
        axios
            .put(
                `https://autenticacion-global-dreamlab.azurewebsites.net/api/user/${editingProduct.id}`,
                editingProduct
            )
            .then(() => {
                console.log(editingProduct);

                // Actualizar el estado y limpiar el producto en edición
                setProducts(
                    products.map((product) =>
                        product.id === editingProduct.id
                            ? editingProduct
                            : product
                    )
                );
                setEditingProduct(null);
            })
            .catch((error) => {
                console.error("Error updating product:", error);
            });
    };

    return (
        <section className="text-gray-600 body-font pl-12 pt-6">
            <h1 className="title-font sm:text-4xl text-3xl mt-9 ml-9 font-medium text-gray-900">
                Lista de usuarios
            </h1>
            <div className="container px-5 pt-6 pb-24 ml-4 mr-auto flex">
                <div
                    className="lg:w-full w-full overflow-auto"
                    style={{ maxHeight: "355px" }}
                >
                    <table className="table-fixed w-full text-center whitespace-no-wrap">
                        <thead>
                            <tr>
                                <th className="w-1/4 px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-blue-500 rounded-tl rounded-bl">
                                    Nombre
                                </th>
                                <th className="w-2/4 px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-blue-400">
                                    Matrícula
                                </th>
                                <th className="w-1/4 px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-blue-500">
                                    Correo
                                </th>
                                <th className="w-1/4 px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-blue-500">
                                    Contraseña
                                </th>
                                <th className="w-1/4 px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-blue-400">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className={
                                        index % 2 === 0 ? "bg-gray-100" : ""
                                    }
                                >
                                    <td className="px-4 py-2">
                                        {editingProduct &&
                                        editingProduct.id === product.id ? (
                                            <input
                                                type="text"
                                                value={editingProduct.Nombre}
                                                onChange={(e) =>
                                                    setEditingProduct({
                                                        ...editingProduct,
                                                        Nombre: e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            product.Nombre
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editingProduct &&
                                        editingProduct.id === product.id ? (
                                            <input
                                                type="text"
                                                value={
                                                    editingProduct.Id_Credencial
                                                }
                                                onChange={(e) =>
                                                    setEditingProduct({
                                                        ...editingProduct,
                                                        Id_Credencial:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            product.Id_Credencial
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-900">
                                        {editingProduct &&
                                        editingProduct.id === product.id ? (
                                            <div className="flex items-center">
                                                <span className="mr-1">$</span>
                                                <input
                                                    type="text"
                                                    value={editingProduct.Email}
                                                    onChange={(e) =>
                                                        setEditingProduct({
                                                            ...editingProduct,
                                                            Email: e.target
                                                                .value,
                                                        })
                                                    }
                                                    className="w-20"
                                                />
                                            </div>
                                        ) : (
                                            product.Email
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        {editingProduct &&
                                        editingProduct.id === product.id ? (
                                            <input
                                                type="text"
                                                value={editingProduct.Password}
                                                onChange={(e) =>
                                                    setEditingProduct({
                                                        ...editingProduct,
                                                        Password:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        ) : (
                                            "######"
                                        )}
                                    </td>

                                    <td className="px-4 py-2">
                                        {editingProduct &&
                                        editingProduct.id === product.id ? (
                                            <div className="flex">
                                                <button
                                                    onClick={handleSave}
                                                    className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                                                >
                                                    Guardar
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        setEditingProduct(null)
                                                    }
                                                    className="flex-1 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded ml-1"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="flex">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(product)
                                                    }
                                                    className="flex-1 bg-blue-200 hover:bg-blue-500 text-white font-bold py-1 px-2 rounded mr-1"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(product.id)
                                                    }
                                                    className="flex-1 bg-red-200 hover:bg-red-500 text-white font-bold py-1 px-2 rounded ml-1"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default TablaProductos;
