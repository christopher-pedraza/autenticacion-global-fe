import React, { useEffect, useState } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado: npm install axios

function Product(props) {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-5 mx-auto">
                <div className="lg:w-3/4 w-full mx-auto flex flex-wrap">
                    <div className="lg:w-full w-full lg:pr-10 lg:py-6 lg:px-8 bg-white rounded-lg shadow-md" style={{ padding: '20px' }}>
                        <h1 className="text-gray-900 text-lg md:text-xl lg:text-2xl xl:text-3xl title-font font-medium mb-2">
                            {props.nombreProducto}
                        </h1>
                        <p className="leading-relaxed text-xs md:text-sm">
                            {props.descripcion}
                        </p>
                        <div className="flex items-center pb-2 border-b-2 border-gray-100"></div>
                        <div className="flex lg:w-full">
                            <span className="title-font font-medium text-base md:text-lg lg:text-xl xl:text-2xl text-gray-900">
                                ${props.precio}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


function ProductList(props) {
    const [products, setProducts] = useState([]);
    let contador = 0;

    useEffect(() => {
        axios.get("https://pruebaintegradora.azurewebsites.net//api/products/", {
            headers: {
                Authorization: `Bearer ${props.userToken}` // Incluir el token en el encabezado de autorización
            }
        })
        .then((response) => {
            setProducts(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error fetching products:", error);
        });
    }, []);


    return (
        <div>
            {products.map((product) => (
                <Product
                    key={contador++}
                    nombreProducto={product.content.producto}
                    descripcion={product.content.descripcion}
                    precio={product.content.precio}
                />
            ))}
        </div>
    );
}

export default ProductList;
