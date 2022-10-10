import React, { useEffect, useState } from "react";
import "./Todo.css";

const getLocalStorage = () => {
  const list = localStorage.getItem("todolist");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [insertData, setInsertData] = useState("");
  const [data, setData] = useState(getLocalStorage());
  const [isEdited, setIsEdited] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  // adding new items in todolist functionality
  const addItems = () => {
    if (!insertData) {
      alert("Please fill the box");
    } else if (insertData && toggleBtn) {
      setData(
        data.map((curEle) => {
          if (curEle.id === isEdited) {
            return { ...curEle, name: insertData };
          }
          return curEle;
        })
      );
      setInsertData("");
      setIsEdited(null);
      setToggleBtn(false);
    } else {
      const id = new Date().getTime().toString();
      const insertedData = {
        id: id,
        name: insertData,
      };
      setData([...data, insertedData]);
      setInsertData("");
    }
  };

  // remove single item from the list functionality
  const removeItem = (index) => {
    const updatedData = data.filter((curEle) => {
      return curEle.id !== index;
    });
    setData(updatedData);
  };

  // updating the item from the list functionality
  const updateItem = (id) => {
    const editedItem = data.find((curEle) => {
      return curEle.id === id;
    });
    setInsertData(editedItem.name);
    setIsEdited(id);
    setToggleBtn(true);
  };

  //removing all todolist items functionality

  const removeAllItems = () => {
    return setData([]);
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(data));
  }, [data]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="inputs">
          <input
            type="text"
            className="input-items"
            placeholder="Add your list here..."
            value={insertData}
            onChange={(event) => setInsertData(event.target.value)}
          />
          {toggleBtn ? (
            <i
              className="fa-regular fa-pen-to-square icons"
              onClick={() => setInsertData(addItems)}
            ></i>
          ) : (
            <i
              className="fa-solid fa-plus icons"
              onClick={() => setInsertData(addItems)}
            ></i>
          )}
        </div>
        {data.map((curEle) => {
          return (
            <div className="outputs" key={curEle.id}>
              <div className="showItems">{curEle.name}</div>
              <div className="icon-box">
                <i
                  className="fa-solid fa-trash icons"
                  onClick={() => removeItem(curEle.id)}
                ></i>
                <i
                  className="fa-regular fa-pen-to-square icons"
                  onClick={() => updateItem(curEle.id)}
                ></i>
              </div>
            </div>
          );
        })}
        <div className="clear-button">
          <button className="btn" onClick={() => removeAllItems()}>
            Clear List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
