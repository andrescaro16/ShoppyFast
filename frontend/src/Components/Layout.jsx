import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Waves from "./Waves";


function Layout({ children }) {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <Waves/>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout;