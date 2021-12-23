import { StoryFn as StoryFunction, StoryContext } from "@storybook/addons";
import { useEffect, useGlobals } from "@storybook/addons";
import React from "react";
import { ComponentWrapper } from './components/ComponentWrapper/ComponentWrapper';

export const withGlobals = (StoryFn: StoryFunction, context: StoryContext) => {
  const [{ myAddon }] = useGlobals();

  const enabled = context.viewMode === "story" && myAddon;
    console.log(context);
  if (!enabled) {
    return StoryFn();
  }

  return (
      <ComponentWrapper props={context.args} name="test">
         {StoryFn()}
      </ComponentWrapper>
  );
};

function displayToolState(selector: string, state: any) {
  const rootElement = document.querySelector(selector);
  let preElement = rootElement.querySelector("pre");

  if (!preElement) {
    preElement = document.createElement("pre");
    preElement.style.setProperty("margin-top", "2rem");
    preElement.style.setProperty("padding", "1rem");
    preElement.style.setProperty("background-color", "#eee");
    preElement.style.setProperty("border-radius", "3px");
    preElement.style.setProperty("max-width", "600px");
    rootElement.appendChild(preElement);
  }

  preElement.innerText = `This snippet is injected by the withGlobals decorator.
It updates as the user interacts with the ⚡ tool in the toolbar above.

${JSON.stringify(state, null, 2)}
`;
}
