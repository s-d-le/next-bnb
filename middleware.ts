export { default } from "next-auth/middleware";

//protected routes. Must logged in to access
export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
