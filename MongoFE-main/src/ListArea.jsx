const ListArea = ({productos}) => {
  return (
    <>
      <div className="list-group">
        {productos.map(producto => 
        <a
          key={producto.id}
          href="#"
          className="list-group-item list-group-item-action"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{producto.producto}</h5>
            <small>{producto.precio}</small>
          </div>
          <small>Futura descripcion del producto</small>
        </a>
        )}
        
      </div>
    </>
  );
};

export default ListArea;
