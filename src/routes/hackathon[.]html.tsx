import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/hackathon.html")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/projects", search: location.search, statusCode: 308 });
  },
});
