import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder/TextDecoder
Object.assign(globalThis, { TextEncoder, TextDecoder });

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        todos: [
          { id: 1, todo: "Mock todo 1", userId: 1, completed: false },
          { id: 2, todo: "Mock todo 2", userId: 2, completed: true },
        ],
      }),
  })
) as jest.Mock;
