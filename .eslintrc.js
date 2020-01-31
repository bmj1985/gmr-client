module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "@vue/standard",
    "plugin:vue/essential",
    "plugin:prettier/recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": "error",
    semi: ["error", "never"],
    quotes: ["error", "single"]
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  plugins: ["prettier"]
}
