import { Form, Link, useLoaderData } from "react-router-dom";
import { useRecoilValue } from "recoil";
import PageContainer from "../Components/PageContainer";
import { useGetUser, usersState } from "../store";

export async function loader({ params }) {
  return params.userId;
}

export default function UserPage() {
  const { loading } = useRecoilValue(usersState);
  const user = useGetUser(useLoaderData());
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
      <span className="text-2xl">{user.name} - </span>
      <Link to="edit">Edit</Link>
      <br />
      <span className="text-sm">{user.email}</span>
      <br />
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
