import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import UserNotFound from "../Components/UserNotFound";
import { deleteUser } from "../firestore";
import { deleteImage } from "../storage";
import { currentUserState, useGetUser, usersState } from "../store";
import { Button } from "./user";

export default function DeletePage() {
  const navigate = useNavigate();
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
    <div className="flex flex-col items-center justify-center m-4 text-center">
      <h1 className="my-8 text-4xl">
        ¿Seguro que quieres eliminar este usuario?
      </h1>
      <div className="w-60 h-60 overflow-hidden rounded-xl mr-5 ">
        <img className="w-full h-full object-cover" src={user.avatar} alt="" />
      </div>
      <div className="flex-col mt-4">
        <h1 className="inline text-2xl font-bold tracking-wider">
          {user.firstName} {user.lastName}
        </h1>
        <p className=" text-blue-400 ">{user.email}</p>
        <div className="mt-6 text-lg">
          <Button
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              deleteUser(user.id)
                .then(() => {
                  deleteImage(user.avatar);
                  navigate("/");
                })
                .catch((error) =>
                  alert("Error al eliminar el usuario: " + error)
                );
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}
