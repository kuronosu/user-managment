import { MdAdd } from "react-icons/md";
import PageContainer from "../../Components/PageContainer";
import UserList from "../../Components/UserList";

export default function HomePage() {
  return (
    <PageContainer>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl">Manage Users</h1>
        <MdAdd
          size={34}
          className="hover:rotate-45 duration-150 p-1 m-1 cursor-pointer"
          onClick={() => {}}
        />
      </div>
      <UserList />
    </PageContainer>
  );
}
