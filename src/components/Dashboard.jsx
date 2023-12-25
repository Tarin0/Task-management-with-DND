import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Toaster } from 'react-hot-toast'


const Dashboard = () => {
    return (
        <DndProvider backend={HTML5Backend}>
        <div className='relative min-h-screen md:flex'>
            <Sidebar />
            <div className='flex-1  md:ml-64'>
                <div className='p-5'>
                    <Outlet />
                    <Toaster></Toaster>
                </div>
            </div>
        </div>
        </DndProvider>

    )
}

export default Dashboard