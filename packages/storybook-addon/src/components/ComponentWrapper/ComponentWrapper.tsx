import React, { useRef } from "react";

import { styled } from "@storybook/theming";

import { useDragToFigma } from "./dragToFigma";

const ComponentWrapperDiv = styled.div(() => ({
  display: "inline-block",
}));


const ComponentWrapperElement = styled.div(() => ({
  display: "inline-block",
  pointerEvents: "none",
}));

export const ComponentWrapper: React.FC<{ name: string, props: unknown }> = ({ name, props, children }) => {
  const dragRef = useRef(null);
  useDragToFigma(dragRef, { name, props });

  return (
    <ComponentWrapperDiv id="ComponentWrapper" ref={dragRef} draggable>
      <ComponentWrapperElement>{children}</ComponentWrapperElement>
    </ComponentWrapperDiv>
  );
};
