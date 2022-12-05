import { useRecoilValue } from "recoil";
import { usersState } from "../store";
import UserListItem from "./UserListItem";

// eslint-disable-next-line no-unused-vars
const fakeUsers = Array(100).fill({
  id: "1",
  name: "John Doe",
});

export default function UserList() {
  const users = useRecoilValue(usersState);
  if (users.loading)
    return (
      <div className="w-full flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" />
      </div>
    );
  if (users.error) return <div>{users.error}</div>;
  return (
    <ul className="overflow-y-auto h-[calc(100%-60px)] px-4">
      {users.data.map((user) => (
        <UserListItem key={user.id} user={user} />
      ))}
    </ul>
  );
}
