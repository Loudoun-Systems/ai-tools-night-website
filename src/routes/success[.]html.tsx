import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/success.html")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/legacy-receipt", search: location.search, statusCode: 308 });
  },
});
