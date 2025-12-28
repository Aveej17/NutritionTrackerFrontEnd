const NotFound = ({
  title = "404",
  message = "Oops! Page not found",
  actionLabel = "Return to Home",
  actionHref = "/",
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{title}</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {message}
        </p>
        <a
          href={actionHref}
          className="text-primary underline hover:text-primary/90"
        >
          {actionLabel}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
