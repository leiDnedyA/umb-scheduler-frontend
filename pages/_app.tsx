import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/styles/globals.css";
import { getToken } from "next-auth/jwt";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export async function getServerSideProps(context: any) {
  const token = getToken(context);
  console.log('here')
  console.log(token)
}
