import tw from "tailwind-styled-components";
import { Outlet } from "react-router-dom";
import PageContainer from "../Components/PageContainer";
import UserList from "../Components/UserList";

export default function Root() {
  return (
    <PageContainer>
      <div className="flex flex-row w-full h-full">
        <div className="w-1/4 border-r border-neutral-700 h-full py-4 max-h-full flex-col min-h-full">
          <div className="flex justify-between items-center mb-5 px-4">
            <SearchInput
              name="q"
              type="search"
              placeholder="Search"
              aria-label="Search users"
            />
            <NewButton>New</NewButton>
          </div>
          <UserList />
        </div>
        <div className="w-3/4 h-full p-4">
          <Outlet />
        </div>
      </div>
    </PageContainer>
  );
}

const SearchInput = tw.input`
  py-2 px-3 mr-1
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
  text-blue-700
`;