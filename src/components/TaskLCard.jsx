/* eslint-disable react/prop-types */

import { useState } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

const TaskCard = ({ data }) => {
 console.log(data);
    const { _id, title, description, deadline, priority, status } = data;
    const [newTask, setNewTask] = useState(data);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "myTask",
        item: { id: _id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    console.log("dragging ? : ", isDragging);

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        console.log(id);
        const form = e.target;
        const title = form.title.value;
        const deadline = form.deadline.value;
        const description = form.description.value;
        const updateTask = { title, deadline, description }
        console.log(id);
        fetch(`https://task-management-server-gamma-five.vercel.app/task/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success("Task updated successfully");
                }
            })

    };

    const handleDelete = async (e, id) => {
        fetch(`https://task-management-server-gamma-five.vercel.app/task/${id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Task deleted successfully');
                    console.log(data);
                    const remainingTask = newTask.filter(t => t._id !== id);
                    setNewTask(remainingTask);
                }
            });
    }

    return (
            <div ref={drag} className="card w-full mt-5 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{data.title}</h2>
                                <p>{description}</p>
                                <p>Deadline : {deadline}</p>
                                <div className="card-actions justify-between">
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Edit</button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <form id='form' action="" className="space-y-4" onSubmit={(e) => handleSubmit(e, _id)}>
                                                <div>
                                                    <label className="sr-only" name="title">Task Title</label>
                                                    <input
                                                        // {...register('tasktitle')}
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                                        placeholder="Task Title"
                                                        type="text"
                                                        id="title"
                                                        defaultValue= {title}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="sr-only" name="deadline">Deadline</label>
                                                    <input
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"

                                                        placeholder="Task Deadline"
                                                        type="date"
                                                        id="deadline"
                                                        defaultValue={deadline}
                                                    // {...register('date')}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="sr-only" >Task Description</label>

                                                    <textarea
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                                        placeholder="Task Description"
                                                        rows="8"
                                                        id="message"
                                                        name="description"
                                                        defaultValue={description}
                                                    // {...register('description')}
                                                    ></textarea>
                                                </div>
                                                <div className="mt-4">
                                                    <button
                                                        type="submit"
                                                        className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                                                    >
                                                        Update Task
                                                    </button>
                                                </div>
                                            </form>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn">Close</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                    <button onClick={(e) => handleDelete(e, _id)} className="btn">Delete</button>
                                </div>
                            </div>
                        </div>

        
    );
};

export default TaskCard;