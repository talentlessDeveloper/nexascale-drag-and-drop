import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div
      id="error-page"
      className="flex h-screen flex-col items-center justify-center text-center text-whatsapp-white"
    >
      <h1 className="text-2xl font-semibold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <p>{error.data || null}</p>
    </div>
  );
}
