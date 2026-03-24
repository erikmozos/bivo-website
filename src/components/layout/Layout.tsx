import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navbar />
    <main className="min-w-0 w-full max-w-full overflow-x-hidden break-words">{children}</main>
    <Footer />
  </>
);

export default Layout;
