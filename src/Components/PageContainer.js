export default function PageContainer({ children }) {
  return (
    <div className="w-full h-full bg-[#121212]">
      {" "}
      {/* grid place-items-center */}
      {children}
      {/* <div className="bg-[#1e1e1e] p-8 rounded-lg shadow-lg w-4/6 h-2/4">
      </div> */}
    </div>
  );
}
