import { useLoaderData, useNavigate } from "react-router-dom";
import { useState } from "react";
import UserForm from "../Components/UserForm";
import { updateUser } from "../firestore";
import { uploadAvatar } from "../storage";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserState, useGetUser, usersState } from "../store";
import { useEffect } from "react";
import UserNotFound from "../Components/UserNotFound";

export default function EditPage() {
  const [formLoading, setFormLoading] = useState(false);

  const navigate = useNavigate();
  const user = useGetUser(useLoaderData());
  const { loading } = useRecoilValue(usersState);
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
    <UserForm
      isEditForm
      title={`Editar datos de ${user.firstName}`}
      loading={formLoading}
      initialValues={user}
      onSubmit={(data) => {
        setFormLoading(true, data);
        if (data.avatar instanceof File) {
          uploadAvatar(user.id, data.avatar, user.avatar)
            .then(([url, ref]) => {
              updateUser(user.id, { ...data, avatar: url });
              navigate(`/users/${user.id}`);
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setFormLoading(false);
            });
        } else {
          updateUser(user.id, data)
            .then(() => {
              navigate(`/users/${user.id}`);
            })
            .finally(() => {
              setFormLoading(false);
            });
        }
      }}
    />
  );
}
