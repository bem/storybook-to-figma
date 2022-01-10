import { styled } from "@storybook/theming";

export default styled.div(({ theme }) => ({
    background: theme.background.content,
    padding: "4rem 20px",
    minHeight: "100vh",
    boxSizing: "border-box",
}));