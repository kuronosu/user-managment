import { useRouteError } from "react-router-dom";
import PageContainer from "../Components/PageContainer";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <PageContainer>
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </PageContainer>
  );
}
