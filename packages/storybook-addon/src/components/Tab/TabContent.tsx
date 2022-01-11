import React from "react";
import TabWrapper from "./TabWrapper";
import TabInner from "./TabInner";
import { useStorybookApi, combineParameters, useStorybookState, useArgTypes } from '@storybook/api';

interface TabContentProps {
  code: string;
}

export const TabContent: React.FC<TabContentProps> = (props: TabContentProps) => {
  // TODO: Move component getter code to the separate hook
  let storybookApi   = useStorybookApi();
  let storybookState = useStorybookState();
  let argTypes       = useArgTypes();

  if (!storybookState.storyId) return <></>

  const groups = storybookState.storyId.trim().split("--");

  let selectedComponent = storybookApi.resolveStory(groups[0]);

  return (<TabWrapper>
      <TabInner>
        {selectedComponent ? selectedComponent.name : "Select a Story"}
      </TabInner>
    </TabWrapper>)
};
