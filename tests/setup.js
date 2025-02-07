const { TextEncoder, TextDecoder } = require('util');
require('whatwg-fetch');
require('@testing-library/jest-dom');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

process.env.NODE_ENV = "test";

global.fetch = jest.fn((url) => {
    if (url === '/api/csrf-token') {
      return Promise.resolve({
        ok: true,
        json: async () => ({ csrfToken: 'mock-csrf-token' }),
      });
    }
    if (url === '/api/auth/register') {
      return Promise.resolve({
        ok: true,
        json: async () => ({ message: 'Registration successful!' }),
      });
    }
    return Promise.reject(new Error('Unknown URL'));
  });
  