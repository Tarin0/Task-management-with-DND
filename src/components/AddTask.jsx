import { useForm } from 'react-hook-form';

import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // const onSubmit = data => console.log(data);

    const handleTaskSubmit = (formData) => {
        const email = user?.email;
        const title = formData.title;
        const deadline = formData.deadline
        const priority = formData.priority
        const description = formData.description

        try {
            const task = { email, title, description, deadline, priority, status: 'todo' };
            fetch('https://task-management-server-gamma-five.vercel.app/task', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        toast.success('Your Task added');
                        reset();
                    }
                })
        }
        catch (err) {
            toast.error(err);
        }

    };
    return (
        <div>
            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                <form id='form' action="" className="space-y-4" onSubmit={handleSubmit(handleTaskSubmit)}>
                    <div>
                        <label className="sr-only" name="title">Task Title</label>
                        <input
                            // {...register('tasktitle')}
                            {...register("title", { required: true })}
                            className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                            placeholder="Task Title"
                            type="text"
                            id="title"
                        />
                        {errors.title && (
                            <span className="text-red-600">
                                Task Title is required
                            </span>
                        )}
                    </div>
                    <div>
                        <label className="sr-only" name="deadline">Deadline</label>
                        <input
                            {...register("deadline", { required: true })}
                            className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"

                            placeholder="Task Deadline"
                            type="date"
                            id="deadline"
                        // {...register('date')}
                        />
                        {errors.deadline && (
                            <span className="text-red-600">
                                Deadline is required
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-3">
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Low Priority</span>
                                <input
                                    {...register("priority", { required: true })}
                                    type="radio"
                                    name="priority"
                                    className="radio checked:bg-red-500"
                                    value="low"

                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Medium Priority</span>
                                <input
                                    {...register("priority", { required: true })}
                                    type="radio"
                                    name="priority"
                                    className="radio checked:bg-blue-500"
                                    value="medium"

                                />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">High Priority</span>
                                <input
                                    {...register("priority", { required: true })}
                                    type="radio"
                                    name="priority"
                                    className="radio checked:bg-green-500"
                                    value="high"

                                />
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="sr-only" >Task Description</label>

                        <textarea
                            {...register("description", { required: true })}
                            className="block w-full rounded-lg border border-gray-400 p-3 text-gray-600 hover:border-black peer-checked:border-black peer-checked:bg-black peer-checked:text-white"
                            placeholder="Task Description"
                            rows="8"
                            id="message"
                            name="description"
                        // {...register('description')}
                        ></textarea>
                        {errors.description && (
                            <span className="text-red-600">
                                Description is required
                            </span>
                        )}
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;


