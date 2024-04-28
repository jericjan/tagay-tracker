// import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
  // eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { react: react },
    rules: { "react/no-unused-prop-types": "error" },
    ignores: ["node_modules/*", ".expo/*", "dist/*"],
  }
);
