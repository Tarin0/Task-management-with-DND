import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'

const HostMenu = () => {
  return (
    <>
      <MenuItem icon={BsFillHouseAddFill} label='Add Task' address='add-task' />
      <MenuItem icon={MdHomeWork} label='My Task' address='my-task' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Task'
        address='manage-task'
      />
    </>
  )
}

export default HostMenu