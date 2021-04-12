import { HomeOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import styled from "styled-components";

export const SiteLayout = styled(Layout)`
  height: 100vh;
`;

export const HamburgerSider = styled(Layout.Sider).attrs({
  breakpoint: "lg",
  collapsedWidth: "0",
  trigger: null,
})``;

export const SiteLogo = styled.div`
  height: 32px;
  width: 160px;
  background-color: rgba(251, 12, 66, 0.5);
  margin: 16px;
`;

export const SiteHeader = styled(Layout.Header)`
  padding: 0;
  background: #fff;
`;

export const HomeButton = styled(HomeOutlined)`
  font-size: 18px;
  line-height: 64px;
  padding: 0 8px;
  cursor: pointer;
  transition: color 0.5s;
`;

export const ContentContainer = styled(Layout.Content)`
  margin: 24px 16px 0;
  height: 100%;
`;

export const SiteContent = styled.div`
  height: 100%;
  background: rgba(255, 255, 255);
  margin: 8px;
  padding: 24px;
  min-height: 360px;
`;

export const SiteFooter = styled(Layout.Footer)`
  text-align: center;
`;
