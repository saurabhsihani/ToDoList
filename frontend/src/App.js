import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const endPoint = "http://localhost:8080/";

function App() {
  const [alert, setAlert] = useState({ show: false, alertClass: "", message: "" });
  const [inputItem, setInputItem] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);

  const getTodos = (method, data) => {
    fetch(`${endPoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => setList(data.items));
  }

  useEffect(() => {
    getTodos("GET");
  }, []);

  const callAlert = (show = false, type = "", msg = "") => {
    setAlert({
      show: show,
      alertClass: type,
      message: msg
    });
  }

  const addItem = () => {
    const data = { 
      action: "add",
      todo: inputItem 
    };
    getTodos("POST", data);

    setInputItem("");
    callAlert(true, "alert-success", "item added to the list");
  };

  const deleteItem = id => {
    const data = { action: "delete", id };
    getTodos("POST", data);
    callAlert(true, "alert-danger", "item removed");
  };

  const editItem = (id, todo) => {
    setInputItem(todo);
    setEditId(id);
  };

  const clearList = () => {
    getTodos("POST", { action: "clear" });
    callAlert(true, "alert-danger", "empty list");
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if(inputItem === "") {
      callAlert(true, "alert-danger", "please enter value");
    }
    else if(editId === null) {
      addItem();
    }
    else {
      const data = {
        action: "edit",
        id: editId,
        todo: inputItem
      }
      getTodos("POST", data);
      setInputItem("");
      setEditId(null);
      callAlert(true, "alert-success", "value changed");
    }
  };

  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={handleFormSubmit}>
        {alert.show && <Alert alertClass={alert.alertClass} message={alert.message} removeAlert={callAlert} list={list} />}
        <h3>Todo list</h3>
        <div className="form-control">
          <input type="text" className="todo" placeholder="e.g. Buy food" value={inputItem} onChange={event => setInputItem(event.target.value)} />
          <button type="submit" className="submit-btn">{editId === null ? "submit" : "edit"}</button>
        </div>
      </form>
      {list.length > 0 && <List list={list} clearList={clearList} deleteItem={deleteItem} editItem={editItem} />}
    </section>
  );
}

export default App
