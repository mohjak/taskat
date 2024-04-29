/** @jsxImportSource react */
"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const initialState = {
        name: '',
        description: '',
        dueDate: ''
    };

    const [task, setTask] = useState(initialState);
    const [tasks, setTasks] = useState([]);
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    
    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = `${process.env.NEXT_PUBLIC_API_URL}/tasks${editTaskId ? `/${editTaskId}` : ''}`;
        const method = editTaskId ? 'patch' : 'post';

        try {
            const response = await axios[method](url, task);
            console.log(`Task ${editTaskId ? 'updated' : 'created'}:`, response.data);
            setTask(initialState);
            setEditTaskId(null);
            fetchTasks();  // Refetch tasks after adding or updating
        } catch (error) {
            console.error(`Error ${editTaskId ? 'updating' : 'creating'} task:`, error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`);
            fetchTasks(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = (task) => {
        setEditTaskId(task._id);
        const formattedDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '';
        setTask({ name: task.name, description: task.description, dueDate: formattedDate });
    };

    const handleCancel = () => {
        setEditTaskId(null);
        setTask(initialState);
    };

    return (
        <div className="max-w-xl mx-auto p-5">
            <h1 className="text-lg font-semibold mb-6">{editTaskId ? 'Edit Task' : 'Create Task'}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={task.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                />
                <input
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                />
                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    placeholder="Due Date"
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
                >
                    {editTaskId ? 'Update Task' : 'Create Task'}
                </button>
                {editTaskId && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full mt-2 bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-700"
                    >
                        Cancel Edit
                    </button>
                )}
            </form>
            <div>
                <h2>Tasks List</h2>
                <ul>
                    {tasks.map(task => (
                        <li key={task._id}>
                            {task.name} - {task.description} - {new Date(task.dueDate).toLocaleDateString()}
                            <button onClick={() => handleEdit(task)} className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(task._id)} className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
