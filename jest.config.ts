import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",

    // 👇 point to your actual mocks inside src/tests
    "\\.(svg)$": "<rootDir>/src/tests/__mocks__/svgMock.ts",
    "\\.(jpg|jpeg|png|gif|webp|avif)$":
      "<rootDir>/src/tests/__mocks__/fileMock.ts",

    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  transformIgnorePatterns: [
    "node_modules/(?!(lucide-react)/)", // allow lucide-react if needed
  ],
};

export default config;
