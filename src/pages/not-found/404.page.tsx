import { useRouteError, isRouteErrorResponse, Link } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "An unexpected error occurred.";
  let errorStatus = "";

  if (isRouteErrorResponse(error)) {
    errorStatus = `${error.status}`;
    errorMessage = error.statusText || error.data?.message || errorMessage;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen  text-center mx-auto">
      <h1 style={styles.heading}>Упс!</h1>
      <p style={styles.text}>Ошибочка вышла...</p>
      <p style={styles.errorText}>
        <i>
          {errorStatus && `${errorStatus}: `}
          {errorMessage}
        </i>
      </p>
      <Link to="/" style={styles.link}>
        На главную
      </Link>
    </div>
  );
}

const styles = {
  heading: { fontSize: "3rem", color: "#e53e3e", marginBottom: "1rem" },
  text: { fontSize: "1.25rem", color: "#4a5568", marginBottom: "0.5rem" },
  errorText: { color: "#718096", marginBottom: "2rem" },
  link: { color: "#3182ce", textDecoration: "none", fontWeight: "bold" },
};
