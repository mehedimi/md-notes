import { LanguageDescription, LanguageSupport } from "@codemirror/language";

export default [
  LanguageDescription.of({
    name: "javascript",
    alias: ["js", "jsx"],
    async load() {
      const { javascriptLanguage } = await import(
        "@codemirror/lang-javascript"
      );
      return new LanguageSupport(javascriptLanguage);
    },
  }),
  LanguageDescription.of({
    name: "css",
    async load() {
      const { cssLanguage } = await import("@codemirror/lang-css");
      return new LanguageSupport(cssLanguage);
    },
  }),
  LanguageDescription.of({
    name: "html",
    alias: ["htm"],
    async load() {
      const { htmlLanguage } = await import("@codemirror/lang-html");
      return new LanguageSupport(htmlLanguage);
    },
  }),
  LanguageDescription.of({
    name: "json",
    async load() {
      const { jsonLanguage } = await import("@codemirror/lang-json");
      return new LanguageSupport(jsonLanguage);
    },
  }),
  LanguageDescription.of({
    name: "php",
    async load() {
      const { phpLanguage } = await import("@codemirror/lang-php");
      return new LanguageSupport(phpLanguage);
    },
  }),
];
