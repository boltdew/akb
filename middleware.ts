import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define the routes that should be public and accessible without authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/docs(.*)', // The docs pages are public, but content within is gated
  '/api/stripe-webhook',
  '/api/clerk-webhook',
]);

export default clerkMiddleware((auth, req) => {
  // Protect all routes that are not defined as public
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except for static files and Next.js internal paths.
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
