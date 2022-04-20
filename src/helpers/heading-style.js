import { HighlightStyle, tags } from "@codemirror/highlight";

export default HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "2em",
    fontWeight: "bold",
    color: "#e6c07b",
  },
  {
    tag: tags.heading2,
    fontSize: "1.8em",
    fontWeight: "bold",
    color: "#e6c07b",
  },
  {
    tag: tags.heading3,
    fontSize: "1.5em",
    fontWeight: "bold",
    color: "#e6c07b",
  },
  {
    tag: tags.heading4,
    fontSize: "1.3em",
    fontWeight: "bold",
  },
]);
