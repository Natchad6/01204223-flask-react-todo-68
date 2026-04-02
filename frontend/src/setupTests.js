import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

import { vi } from "vitest";

const localStorageMock = {
  store: {
    username: "testuser",
    accessToken: "fake-token",
  },

  getItem(key) {
    return this.store[key] ?? null;
  },

  setItem(key, value) {
    this.store[key] = String(value);
  },

  removeItem(key) {
    delete this.store[key];
  },

  clear() {
    this.store = {};
  },
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});