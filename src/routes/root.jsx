import tw from "tailwind-styled-components";
import PageContainer from "../Components/PageContainer";

export default function Root() {
  return (
    <PageContainer>
      <div className="w-1/4 border-r border-neutral-700 h-full p-4">
        <div className="flex justify-between items-center mb-5">
          <SearchInput
            name="q"
            type="search"
            placeholder="Search"
            aria-label="Search users"
          />
          <NewButton>New</NewButton>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`contacts/1`}>Your Name</a>
            </li>
            <li>
              <a href={`contacts/2`}>Your Friend</a>
            </li>
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
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
