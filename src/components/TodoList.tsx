import React, { useState } from 'react';

type Props = {
    todos: { id: number; text: string }[];
    setTodos: React.Dispatch<React.SetStateAction<{ id: number; text: string }[]>>;
};

const TodoList = ({ todos, setTodos }: Props) => {
    const [newTask, setNewTask] = useState('');

    const addTask = () => {
        if (!newTask.trim()) return;
        const newTaskObj = { id: Date.now(), text: newTask };
        setTodos(prev => [...prev, newTaskObj]);
        setNewTask('');
    };

    const deleteTask = (id: number) => {
        setTodos(prev => prev.filter(task => task.id !== id));
    };

    return (
        <div>
            <h2>To-Do</h2>
            <ul>
                {todos.map(task => (
                    <li key={task.id}>
                        {task.text}
                        <button onClick={() => deleteTask(task.id)}>x</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTask}
                onChange={e => setNewTask(e.target.value)}
                placeholder="Add a task"
            />
            <button onClick={addTask}>Add</button>
        </div>
    );
};

export default TodoList;
