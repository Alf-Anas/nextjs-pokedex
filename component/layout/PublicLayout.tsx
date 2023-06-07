import { Layout as LayoutANTD, theme } from "antd";
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { ROUTE } from "@/constant/route";
import Footer from "./Footer";
import HeaderNav from "./HeaderNav";

const { Header, Content } = LayoutANTD;

const layoutStyle: React.CSSProperties = {
  minHeight: "100vh",
};

export default function PublicLayout({ children }: Props) {
  const router = useRouter();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LayoutANTD style={layoutStyle}>
      <Header style={{ paddingInline: "16px" }}>
        <div style={{ display: "flex" }}>
          <div
            className="logo"
            style={{
              width: "10rem",
              textAlign: "center",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              router.push(ROUTE.HOME.URL);
            }}
          >
            <span
              style={{
                backgroundColor: "whitesmoke",
                padding: "12px 50px",
                opacity: "65%",
              }}
            >
              LOGO
            </span>
          </div>
          <HeaderNav />
        </div>
      </Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          background: colorBgContainer,
        }}
      >
        {children}
      </Content>
      <Footer />
    </LayoutANTD>
  );
}

interface Props {
  children?: ReactNode;
}
