import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router";

const Root = () => {
    return (
      <div className="app-layout">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  };
  
  export default Root;
  


