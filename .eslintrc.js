module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "prettier/prettier": [
      "warn",
      {
        "#": "prettier config in here :)",
        singleQuote: false,
        semi: true,
        trailingComma: "none"
      }
    ]
  },

  parserOptions: {
    parser: "babel-eslint"
  }
};
