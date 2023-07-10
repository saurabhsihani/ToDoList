import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({ list, clearList, editItem, deleteItem }) => {
  return (
    <div className="todo-container">
      <div className="todo-list">
        {list.map((listItem) => {
          return (
            <article className="todo-item" key={listItem._id}>
              <p className="title">{listItem.todo}</p>
              <div className="btn-container">
                <button type="button" className="edit-btn" onClick={() => editItem(listItem._id, listItem.todo)}>
                  <FaEdit />
                </button>
                <button type="button" className="delete-btn" onClick={() => deleteItem(listItem._id)}>
                  <FaTrash />
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <button className="clear-btn" onClick={clearList}>clear items</button>
    </div>
  );
}

export default List
