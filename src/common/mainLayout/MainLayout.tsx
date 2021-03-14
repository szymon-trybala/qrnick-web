import { Layout, Menu } from "antd";
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

const MainLayout: React.FC = ({ children }) => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const toggleSider = () => {
    setSiderCollapsed(!siderCollapsed);
  };

  const getToggleSiderButton = () => {
    if (siderCollapsed)
      return <TriggerMenuUnfoldOutlined onClick={toggleSider} />;
    else return <TriggerMenuFoldOutlined onClick={toggleSider} />;
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
          <Menu.Item key="3" icon={<UserOutlined />}>
            Konto
          </Menu.Item>
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
