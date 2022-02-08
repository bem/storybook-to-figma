import React, { useRef } from "react";
import { styled } from "@storybook/theming";

import { useDragToFigma } from "../../hooks/dragToFigma";

const DragWrapperDiv = styled.div(() => ({
  display: "inline-block",
}));


const DragWrapperElement = styled.div(() => ({
  display: "inline-block",
  pointerEvents: "none",
}));

export const DragComponent: React.FC<{ name: string, props: unknown }> = ({ name, props, children }) => {
  const dragRef = useRef(null);
  useDragToFigma(dragRef, { name, props });

  return (
    <DragWrapperDiv id="DragWrapper" ref={dragRef} draggable>
      <DragWrapperElement>{children}</DragWrapperElement>
    </DragWrapperDiv>
  );
};
