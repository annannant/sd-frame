import { Outlet } from "react-router-dom";
import { Content, Navbar,  } from "./main-layout.styles";
import Sidebar from "../sidebar/sidebar";

export const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col">
        <Navbar className="shadow-md z-10" />
        <div className="flex flex-row">
          <Sidebar />
          <Content className="flex-1">
            <Outlet />
          </Content>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
