import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext, useState } from "react";
import toast from "react-hot-toast";


const MyTask = () => {
    const taskInfo = useLoaderData();
    const { user } = useContext(AuthContext);
    const myTask = taskInfo.filter(t =>
        t.email === user?.email);
    const [newTask, setNewTask] = useState(myTask);

    

    
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

    const fTodos = newTask.filter(task => task.status === "todo")
    console.log(fTodos);
    const fOngoing = newTask.filter(task => task.status === "ongoing")
    const fComplete = newTask.filter(task => task.status === "complete")

    return (
        <div>
            <div className="grid grid-cols-3 gap-16">
                <div>
                    <div className="bg-green-400 cursor-grab rounded-md h-12 flex items-center pl-4 uppercase text-xl text-white">
                        <p>TO DO {" "} <span className="ml-2">{fTodos.length}</span></p>
                    </div>
                    {fTodos?.length > 0 && fTodos.map((task, idx) =>
                        <div  key={idx} className="card w-full mt-5 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{task.title}</h2>
                                <p>{task.description}</p>
                                <p>Deadline : {task.deadline}</p>
                                <div className="card-actions justify-between">
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Edit</button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <form id='form' action="" className="space-y-4" onSubmit={(e) => handleSubmit(e, task._id)}>
                                                <div>
                                                    <label className="sr-only" name="title">Task Title</label>
                                                    <input
                                                        // {...register('tasktitle')}
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                                        placeholder="Task Title"
                                                        type="text"
                                                        id="title"
                                                        defaultValue={task.title}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="sr-only" name="deadline">Deadline</label>
                                                    <input
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"

                                                        placeholder="Task Deadline"
                                                        type="date"
                                                        id="deadline"
                                                        defaultValue={task.deadline}
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
                                                        defaultValue={task.description}
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
                                    <button onClick={(e) => handleDelete(e, task._id)} className="btn">Delete</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
                <div >
                    <div className="bg-purple-500 rounded-md h-12 flex items-center pl-4 uppercase text-xl text-white">
                        <p>Ongoing {" "} <span className="ml-2">{fOngoing.length}</span></p>
                    </div>
                    {fOngoing?.length > 0 && fOngoing.map((task, idx) =>
                        <div key={idx} className="card w-full mt-5 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{task.title}</h2>
                                <p>{task.description}</p>
                                <p>Deadline : {task.deadline}</p>
                                <div className="card-actions justify-between">
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Edit</button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <form id='form' action="" className="space-y-4" onSubmit={(e) => handleSubmit(e, task._id)}>
                                                <div>
                                                    <label className="sr-only" name="title">Task Title</label>
                                                    <input
                                                        // {...register('tasktitle')}
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                                        placeholder="Task Title"
                                                        type="text"
                                                        id="title"
                                                        defaultValue={task.title}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="sr-only" name="deadline">Deadline</label>
                                                    <input
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"

                                                        placeholder="Task Deadline"
                                                        type="date"
                                                        id="deadline"
                                                        defaultValue={task.deadline}
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
                                                        defaultValue={task.description}
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
                                    <button onClick={(e) => handleDelete(e, task._id)} className="btn">Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div >
                    <div className="bg-slate-500 rounded-md h-12 flex items-center pl-4 uppercase text-xl text-white">
                        <p>Completed {" "} <span className="ml-2">{fComplete.length}</span></p>
                    </div>
                    {fComplete?.length > 0 && fComplete.map((task, idx) =>
                        <div key={idx} className="card w-full mt-5 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">{task.title}</h2>
                                <p>{task.description}</p>
                                <p>Deadline : {task.deadline}</p>
                                <div className="card-actions justify-between">
                                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Edit</button>
                                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <form id='form' action="" className="space-y-4" onSubmit={(e) => handleSubmit(e, task._id)}>
                                                <div>
                                                    <label className="sr-only" name="title">Task Title</label>
                                                    <input
                                                        // {...register('tasktitle')}
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                                                        placeholder="Task Title"
                                                        type="text"
                                                        id="title"
                                                        defaultValue={task.title}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="sr-only" name="deadline">Deadline</label>
                                                    <input
                                                        className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"

                                                        placeholder="Task Deadline"
                                                        type="date"
                                                        id="deadline"
                                                        defaultValue={task.deadline}
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
                                                        defaultValue={task.description}
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
                                    <button onClick={(e) => handleDelete(e, task._id)} className="btn">Delete</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default MyTask;