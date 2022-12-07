import { deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserForm from "../Components/UserForm";
import { createUser } from "../firestore";
import { uploadAvatar } from "../storage";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default function NewPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  return (
    <UserForm
      title="New User"
      loading={loading}
      onSubmit={(data) => {
        setLoading(true);
        uploadAvatar(uuidv4(), data.avatar)
          .then(([url, ref]) => {
            createUser({ ...data, avatar: url })
              .then((id) => {
                setLoading(false);
                navigate(`/users/${id}`);
              })
              .catch((err) => {
                setLoading(false);
                deleteObject(ref);
                alert("Error al crear el usuario");
              });
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
            alert("Error al cargar la imagen");
          });
      }}
    />
  );
}
