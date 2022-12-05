import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const usersState = atom({
  key: "usersState",
  default: {
    loading: true,
    error: null,
    data: [],
  },
});

export const useUserStateFunctions = () => {
  const setUsers = useSetRecoilState(usersState);
  return {
    setUser: (user) => {
      setUsers({
        loading: false,
        error: null,
        data: user,
      });
    },
    setLoading: (val) => {
      setUsers((prev) => ({
        ...prev,
        loading: val,
        error: null,
      }));
    },
    setError: (error) => {
      setUsers((prev) => ({
        ...prev,
        loading: false,
        error: error,
      }));
    },
  };
};

export const useGetUser = (id) => {
  const users = useRecoilValue(usersState);
  return users.data.find((user) => user.id === id);
};
