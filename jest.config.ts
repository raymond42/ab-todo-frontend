import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(svg)$": "<rootDir>/src/tests/__mocks__/svgMock.ts",
    "\\.(jpg|jpeg|png|gif|webp|avif)$":
      "<rootDir>/src/tests/__mocks__/fileMock.ts",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },

  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        diagnostics: {
          ignoreCodes: [1343],
        },
        astTransformers: {
          before: [
            {
              path: "ts-jest-mock-import-meta",
              options: {
                metaObjectReplacement: {
                  env: {
                    VITE_API_URL: "http://localhost:3000/api",
                  },
                },
              },
            },
          ],
        },
      },
    ],
  },

  transformIgnorePatterns: [
    "node_modules/(?!(lucide-react)/)", // allow lucide-react if needed
  ],
};

export default config;
