import Head from "next/head";
import { PropsWithChildren } from "react";
import Header from "./Header";

type LayoutProps = PropsWithChildren<unknown>;

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Keeb Finder</title>
      </Head>
      <div className="min-h-screen bg-gray-200">
        <Header />
        <div className="w-11/12 mx-auto py-4">
          
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;