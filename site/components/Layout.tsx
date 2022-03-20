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
        <div className="w-5/6 lg:w-2/3 mx-auto py-4">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;