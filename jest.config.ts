import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // <- correct value for Jest 28+
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // <- maps @/ to src/
    "^react-i18next$": "<rootDir>/tests/__mocks__/react-i18next.ts",
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
