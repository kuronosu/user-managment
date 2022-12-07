import tw from "tailwind-styled-components";
import { Link, Outlet } from "react-router-dom";
import PageContainer from "../Components/PageContainer";
import UserList from "../Components/UserList";
import { useResetRecoilState } from "recoil";
import { currentUserState } from "../store";

export default function Root() {
  const clearUser = useResetRecoilState(currentUserState);

  return (
    <PageContainer>
      <div className="flex flex-row w-full h-full">
        <div className="w-1/4 border-r border-neutral-700 h-full py-4 max-h-full flex-col min-h-full min-w-[350px]">
          <div className="flex justify-between items-center pb-4 px-4 border-b border-neutral-700">
            {/* <SearchInput
              name="q"
              type="search"
              placeholder="Search"
              aria-label="Search users"
            /> */}
            <div className="py-2 px-3">
              <h1 className="text-2xl">
                Administracion de usuarios
              </h1>
            </div>
            <Link to="new">
              <NewButton onClick={() => clearUser()}>Añadir</NewButton>
            </Link>
          </div>
          <UserList />
        </div>
        <div className="w-3/4 h-full p-4 bg-[#1e1e1e]">
          <Outlet />
        </div>
      </div>
    </PageContainer>
  );
}

const SearchInput = tw.input`
  py-2 px-3 mr-3
  bg-[#1e1e1e]
  border-none rounded-md
  shadow-sm text-base
  max-w-full grow
  focus:outline-none focus:ring-2
  focus:ring-offset-2 focus:ring-offset-neutral-900
  focus:ring-neutral-700
`;

const NewButton = tw.button`
  py-2 px-3
  text-neutral-300
  border-none rounded-md
  bg-neutral-800 hover:bg-neutral-700
`;
