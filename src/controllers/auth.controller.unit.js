import { authenticate } from "./auth.controller";
import { createRequest, createResponse, createAuth } from "utils/create";

import logger from "@jsassertivo/cli/src/utils/logger";
jest.mock("@jsassertivo/cli/src/utils/logger");

import findUser from "services/user/find";
jest.mock("services/user/find");

const user = {
  uid: "abc-1234",
  userName: "username",
  password: "password",
};

afterEach(() => {
  jest.clearAllMocks();
});

describe("authenticate controller", () => {
  it("should find the user and insert uid in the cookie", async () => {
    const request = createRequest({ body: createAuth() });
    const response = createResponse();

    findUser.usernameAndPassword.mockResolvedValueOnce(user);

    await authenticate(request, response);

    expect(findUser.usernameAndPassword.mock.calls).toEqual([
      [request.body.username, request.body.password],
    ]);

    expect(response.cookie.mock.calls).toEqual([["uid", user.uid]]);

    expect(response.json.mock.calls).toEqual([[user]]);
  });

  it("should return 404 because user is not founded", async () => {
    const request = createRequest({ body: createAuth() });
    const response = createResponse();

    const errorMessage = "Usuário não existente";
    findUser.usernameAndPassword.mockRejectedValueOnce(errorMessage);

    await authenticate(request, response);

    expect(findUser.usernameAndPassword.mock.calls).toEqual([
      [request.body.username, request.body.password],
    ]);

    expect(logger.error.mock.calls).toEqual([
      [expect.any(String), errorMessage],
    ]);
    expect(response.status.mock.calls).toEqual([[404]]);
    expect(response.json.mock.calls).toEqual([[{ message: errorMessage }]]);
  });
});
