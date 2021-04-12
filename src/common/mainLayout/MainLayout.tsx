import { Layout, Space } from "antd";
import {} from "@ant-design/icons";
import React from "react";
import {
  ContentContainer,
  HomeButton,
  SiteContent,
  SiteFooter,
  SiteHeader,
  SiteLayout,
  SiteLogo,
} from "./styles";
import { useHistory } from "react-router";
import { routes } from "../../core/router/routes";

const MainLayout: React.FC = ({ children }) => {
  const history = useHistory();

  const onHomeButtonClick = () => {
    history.push(routes.home);
  };

  return (
    <SiteLayout>
      <Layout>
        <SiteHeader>
          <Space>
            <SiteLogo />
            <HomeButton onClick={onHomeButtonClick} />
          </Space>
        </SiteHeader>
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
