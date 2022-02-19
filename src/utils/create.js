import faker from "faker";

export function createRequest(extra) {
  return {
    body: {},
    ...extra,
  };
}

export function createResponse(extra) {
  const response = {
    json: jest.fn(),
    cookie: jest.fn(() => response),
    status: jest.fn(() => response),
    ...extra,
  };

  return response;
}

export function createAuth(extra) {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...extra,
  };
}
