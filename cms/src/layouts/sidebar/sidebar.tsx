import { Outlet } from "react-router-dom";
import { Container } from "./sidebar.styles";

import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';

export const Sidebar = () => {
  return (
    <Container className="shadow-sm" >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </Container>
  );
};

export default Sidebar;
