import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom", // <- correct value for Jest 28+
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // <- maps @/ to src/
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
