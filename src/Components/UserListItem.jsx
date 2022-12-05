import tw from "tailwind-styled-components";
import { Link } from "react-router-dom";

export default function UserListItem({ user }) {
  return (
    <Container $selected={true}>
      <Link to={`users/${user.id}`}>
        <span>{user.name}</span>
      </Link>
    </Container>
  );
}

const Container = tw.li`
  my-2 p-2
  flex
  justify-between
  items-center 
  text-base
  ${({ $selected }) =>
    $selected &&
    `
      rounded-lg
      shadow-md
      bg-[#1e1e1e]
  `}
`;
