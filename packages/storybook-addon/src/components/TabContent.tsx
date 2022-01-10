import React from "react";
import { styled } from "@storybook/theming";
import { Title, Source, Link } from "@storybook/components";

const TabWrapper = styled.div(({ theme }) => ({
  background: theme.background.content,
  padding: "4rem 20px",
  minHeight: "100vh",
  boxSizing: "border-box",
}));

const TabInner = styled.div({
  maxWidth: 768,
  marginLeft: "auto",
  marginRight: "auto",
});

interface TabContentProps {
  code: string;
}

export const TabContent: React.FC<TabContentProps> = ({ code }) => (
  <TabWrapper>
    <TabInner>
      <Title>Storybook To Figma!</Title>
    </TabInner>
  </TabWrapper>
);
