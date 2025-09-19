import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "text-encoding";

Object.assign(globalThis, { TextEncoder, TextDecoder });
