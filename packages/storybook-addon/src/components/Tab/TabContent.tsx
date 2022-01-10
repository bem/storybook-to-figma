import React from "react";
import { Title, Source, Link } from "@storybook/components";
import TabWrapper from "./TabWrapper";
import TabInner from "./TabInner";

interface TabContentProps {
  code: string;
}

export const TabContent: React.FC<TabContentProps> = (props: TabContentProps) => (
  <TabWrapper>
    <TabInner>
      <Title>Storybook To Figma!</Title>
    </TabInner>
  </TabWrapper>
);
