import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/about.html")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/about", search: location.search, statusCode: 308 });
  },
});
