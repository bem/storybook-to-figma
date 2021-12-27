import { addons, types } from "@storybook/addons";

import { ADDON_ID, TOOL_ID, PANEL_ID } from "../constants";
import { Tool } from "../Tool";
import { Panel } from "../Panel";
import { Tab } from "../Tab";

// Register the addon
addons.register(ADDON_ID, () => {
  // Register the tool
  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: "Storybook-To-Figma",
    match: ({ viewMode }) => !!(viewMode && viewMode.match(/^(story|docs)$/)),
    render: Tool,
  });
  
  // Register the tab
  addons.add(PANEL_ID, {
    type: types.TAB,
    title: "Storybook-To-Figma",
    //👇 Checks the current route for the story
    route: ({ storyId }) => `/storybook-to-figma/${storyId}`,
    //👇 Shows the Tab UI element in myaddon view mode
    match: ({ viewMode }) => viewMode === "storybook-to-figma",
    render: Tab,
  });
});
