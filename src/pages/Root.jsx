import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
      <div className="app-layout">
        <Header name="Finnish Event Planner" />
        <main>
          <Outlet />
        </main>
        <Footer year={2025} />
      </div>
    );
  };
  
  export default Root;
  


