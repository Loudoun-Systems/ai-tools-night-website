import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/careers.html")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/careers", search: location.search, statusCode: 308 });
  },
});
