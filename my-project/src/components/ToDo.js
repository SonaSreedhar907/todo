import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addTodo = () => {
    if (todo !== '') {
      const isDuplicate = todos.some((existingTodo) => existingTodo?.list === todo);
      if (isDuplicate) {
        alert('Todo already exists!');
        return;
      }

      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      setTodo('');
    }
    if (editId) {
      const editTodo = todos.find((todo) => todo.id === editId);
      const updateTodo = todos.map((to) =>
        to.id === editTodo.id ? { ...to, list: todo } : to
      );
      setTodos(updateTodo);
      setEditID(0);
      setTodo('');
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((list) =>
      list.id === id ? { ...list, status: !list.status } : list
    );
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditID(editTodo.id);
  };

  return (
    <div className="container w-72 mt-20 bg-opacity-90 bg-gray-100 border-none p-8 rounded-2xl mx-auto">
      <h2 className="text-center text-gray-800 text-2xl">TODO APP</h2>
      <form className='flex flex-row items-center mt-4' onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Enter your todo"
          className='form-control py-2 px-3 bg-white text-gray-800 rounded border border-gray-300'
          onChange={(event) => setTodo(event.target.value)}
        />
        <button
          className="ml-4 bg-blue-500 text-white rounded p-2 w-1/5 font-bold cursor-pointer hover:bg-blue-600 transition"
          onClick={addTodo}
        >
          {editId ? 'EDIT' : 'ADD'}
        </button>
      </form>
      <div className='mt-8'>
        <ul>
          {todos.map((to) => (
            <li key={to.id} className={`flex justify-between items-center mb-4 px-2 py-2 bg-gray-200 text-gray-800 rounded`}>
              <div className={`flex-1 ${to.status ? 'line-through opacity-50' : ''}`}>
                {to.list}
              </div>
              <span className="ml-4 flex items-center">
                <IoMdDoneAll
                  className='text-green-500 cursor-pointer'
                  title="Complete"
                  onClick={() => onComplete(to.id)}
                />
                <FiEdit
                  className='text-blue-500 cursor-pointer ml-2'
                  title="Edit"
                  onClick={() => onEdit(to.id)}
                />
                <MdDelete
                  className='text-red-500 cursor-pointer ml-2'
                  onClick={() => onDelete(to.id)}
                  title="Delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
