import { Layout, Menu, notification } from "antd";
import {
  HeartOutlined,
  PlayCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import {
  ContentContainer,
  HamburgerSider,
  SiteContent,
  SiteFooter,
  SiteHeader,
  SiteLayout,
  SiteLogo,
  TriggerMenuFoldOutlined,
  TriggerMenuUnfoldOutlined,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../core/store/hooks";
import { logout } from "../../core/store/slices/auth/authSlice";
import { routes } from "../../core/router/routes";
import { useHistory } from "react-router";

const MainLayout: React.FC = ({ children }) => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  const getToggleSiderButton = () => {
    if (siderCollapsed)
      return <TriggerMenuUnfoldOutlined onClick={toggleSider} />;
    else return <TriggerMenuFoldOutlined onClick={toggleSider} />;
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    notification.success({
      message: `Wylogowano`,
    });
    history.push(routes.login);
  };

  return (
    <SiteLayout>
      <HamburgerSider collapsible collapsed={siderCollapsed}>
        <SiteLogo />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<PlayCircleOutlined />}>
            Przeglądaj
          </Menu.Item>
          <Menu.Item key="2" icon={<HeartOutlined />}>
            Ulubione
          </Menu.Item>
          <Menu.SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title={auth.login || "Konto"}
          >
            <Menu.Item key="3">Ustawienia</Menu.Item>
            <Menu.Item key="4" onClick={handleLogout}>
              Wyloguj
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </HamburgerSider>
      <Layout>
        <SiteHeader>{getToggleSiderButton()}</SiteHeader>
        <ContentContainer>
          <SiteContent>{children}</SiteContent>
        </ContentContainer>
        <SiteFooter>
          Qrnick ©2021 Christ & Kazior & Loniek & Treffon & Trybała
        </SiteFooter>
      </Layout>
    </SiteLayout>
  );
};

export default MainLayout;
