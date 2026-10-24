import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/events.html")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/events", search: location.search, statusCode: 308 });
  },
});
