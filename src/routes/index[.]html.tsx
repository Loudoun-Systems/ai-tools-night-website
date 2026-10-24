import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/index.html")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/", search: location.search, statusCode: 308 });
  },
});
