import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/prompt-library.html")({
  beforeLoad: ({ location }) => {
    throw redirect({ to: "/prompt-library", search: location.search, statusCode: 308 });
  },
});
