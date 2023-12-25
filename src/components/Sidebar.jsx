
// Icons
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
// import { BsGraphUp } from 'react-icons/bs'
import { BsFillHouseAddFill } from 'react-icons/bs'

import MenuItem from './MenuItem'
import { useState } from 'react'
import { MdHomeWork ,MdOutlineManageHistory} from 'react-icons/md'


const Sidebar = () => {
    //   const { logOut } = useAuth()
    const [isActive, setActive] = useState(false)


    // Sidebar Responsive Handler
    const handleToggle = () => {
        console.log(isActive);
        setActive(!isActive)

    }
    console.log(isActive);
    return (
        <>
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <p>Dashboard</p>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
                            <p>Dashboard</p>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            <MenuItem
                                icon={MdHomeWork}
                                label='Home'
                                address='/'
                            />
                            <MenuItem
                                icon={MdOutlineManageHistory}
                                label='My Task'
                                address='my-task'
                            />
                            <MenuItem 
                            icon={BsFillHouseAddFill} 
                            label='Add Task' 
                            address='add-task' />
                            
                         
                        </nav>
                    </div>
                </div>

              
            </div>
        </>
    )
}

export default Sidebar