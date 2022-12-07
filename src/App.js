import "./App.css";
import React, { useEffect } from "react";
import { observeUsers } from "./firestore";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import { useUserStateFunctions } from "./store";
import ErrorPage from "./routes/ErrorPage";
import UserPage, { loader as userLoader } from "./routes/user";
import NewPage from "./routes/new";
import EditPage from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "users/:userId",
        element: <UserPage />,
        loader: userLoader,
      },
      {
        path: "users/:userId/edit",
        element: <EditPage />,
        loader: userLoader,
      },
      {
        path: "new",
        element: <NewPage />,
      },
    ],
  },
]);

const UsersProvider = ({ children }) => {
  const { setError, setLoading, setUser } = useUserStateFunctions();
  useEffect(() => {
    setLoading(true);
    return observeUsers(
      (users) => setUser(users),
      (error) =>
        setError(error.message || "Something went wrong. Please try again.")
    );
  }, [setError, setLoading, setUser]);

  return <>{children}</>;
};

function App() {
  return (
    <RecoilRoot>
      <UsersProvider>
        <RouterProvider router={router} />
      </UsersProvider>
    </RecoilRoot>
  );
}

export default App;
