import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";
import { currentUserState } from "../store";
import { useRecoilValue } from "recoil";

export default function UserListItem({ user }) {
  const currentUser = useRecoilValue(currentUserState);
  return (
    <li>
      <Link to={`users/${user.id}`}>
        <Container $selected={currentUser === user.id}>
          <span>{user.name}</span>
        </Container>
      </Link>
    </li>
  );
}

const Container = tw.div`
  flex
  my-2 p-2
  text-base
  items-center 
  justify-between
  ${({ $selected }) =>
    $selected &&
    `
      rounded-lg
      shadow-md
      bg-[#1e1e1e]
  `}
`;
