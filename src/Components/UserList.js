import { MdDelete, MdEdit } from "react-icons/md";

export default function UserList({ users, onEdit, onDelete }) {
  return (
    <ul className='divide-y divide-neutral-600 overflow-auto'>
      {users.map((user) => (
        <li key={user.id} className="flex min-w-[300px] justify-between items-center py-1">
          <span>{user.name}</span>
          <div className="flex">
            <MdEdit className="p-1 m-1 cursor-pointer text-green-600 hover:bg-neutral-700 rounded-full duration-300" size={30} onClick={onEdit} />
            <MdDelete className="p-1 m-1 cursor-pointer text-red-600 hover:bg-neutral-700 rounded-full duration-300" size={30} onClick={onDelete} />
          </div>
        </li>
      ))}
    </ul>
  );
}
