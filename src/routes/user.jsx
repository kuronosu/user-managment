import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, useGetUser, usersState } from "../store";
import tw from "tailwind-styled-components";
import UserNotFound from "../Components/UserNotFound";

export async function loader({ params }) {
  return params.userId;
}

export default function UserPage() {
  const { loading } = useRecoilValue(usersState);
  const user = useGetUser(useLoaderData());
  const setCurrentUser = useSetRecoilState(currentUserState);

  useEffect(() => {
    setCurrentUser(user?.id);
  }, [setCurrentUser, user]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2" />
      </div>
    );
  }

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <div className="flex mt-3 ml-4 ">
      <div className="w-60 h-60 overflow-hidden rounded-xl mr-5 ">
        <img className="w-full h-full object-cover" src={user.avatar} alt="" />
      </div>
      <div className="flex-col">
        <h1 className=" inline text-2xl font-bold tracking-wider">
          {user.firstName} {user.lastName}{" "}
        </h1>
        <Button>
          <Link to="edit">Editar</Link>
        </Button>
        <Button>
          <Link to="delete">Borrar</Link>
        </Button>
        <p className=" text-blue-400 ">{user.email}</p>
        <p className="mb-4">{user.phone}</p>
        <p className="text-sm mb-2">
          {user.description !== "" ? user.description : "Sin estado"}
        </p>
      </div>
    </div>
  );
}

export const Button = tw.button`
font-bold py-2 px-2
mr-2
rounded-md inline-flex items-center
text-neutral-300
hover:text-white
border-none 
bg-[#121212] hover:bg-[#2e2e2e]
`;

// function Favorite({ contact }) {
//   // yes, this is a `let` for later
//   let favorite = contact.favorite;
//   return (
//     <Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </Form>
//   );
// }
