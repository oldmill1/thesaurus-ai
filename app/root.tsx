import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import reset from '~/reset.css';

export const links: LinksFunction = () => {
  return [
    // { rel: 'icon', href: '/favicon.ico' },
    // { rel: 'apple-touch-icon', href: '/logo192.png' },
    // { rel: 'manifest', href: '/manifest.json' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Gilda+Display&family=Shrikhand&display=swap',
    },
    { rel: 'stylesheet', href: reset },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
