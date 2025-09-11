import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { MVCProvider } from "@/app/context/MVCContext";
import { NotificationSystem } from "@/app/components/NotificationSystem";
import stylesheet from "./globals.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>Rick and Morty App</title>
      </head>
      <body>
        <MVCProvider>
          <Outlet />
          <NotificationSystem />
        </MVCProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}