import { useState } from "react";

const InputArea = (props) => {
  const [items, setItems] = useState(props.productos);
  const [newItem, setNewItem] = useState("");

  const addItem = (event) => {
    event.preventDefault();
    const itemObject = {
      id: items.length + 1,
      producto: newItem,
      precio: 120,
    };
    setItems(items.concat(itemObject));
    setNewItem("");
  };

  const handleItemChange = (event) => {
    console.log(event.target.value);
    setNewItem(event.target.value);
  };

  return (
    <>
      <form className="row g-4 mt-5" onSubmit={addItem}>
        <div className="col-7">
          <div className="input-group">
            <input
              value={newItem}
              onChange={handleItemChange}
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername0"
              placeholder="...agregar nuevo producto"
            />
          </div>
        </div>
        <div className="col-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="inlineFormInputGroupUsername1"
              placeholder="precio"
            />
          </div>
        </div>

        <div className="col-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default InputArea;
