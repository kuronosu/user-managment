import { useEffect } from "react";
import { Form, Link, useLoaderData } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, useGetUser, usersState } from "../store";

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
    return <p>User not found</p>;
  }

  return (
    <div>
      <span className="text-2xl">
        {user.firstName} {user.lastName} -{" "}
      </span>
      <Link to="edit">Edit</Link>
      <br />
      <span className="text-sm">{user.email}</span>
      <br />
      <img src={user.avatar} alt="" />
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  let favorite = contact.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}
