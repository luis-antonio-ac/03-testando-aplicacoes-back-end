import { list, create } from "./user.controller";
import { createAuth, createRequest, createResponse } from "utils/create";

import findUser, { basedOnQuery } from "services/user/find";
jest.mock("services/user/find");

import logger from "@jsassertivo/cli/src/utils/logger.js";
jest.mock("@jsassertivo/cli/src/utils/logger.js");

import { createUser } from "services/user/create.js";
jest.mock("services/user/create");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Controller: list", () => {
  it("should return a list of users", async () => {
    const user = createAuth({ uid: "abc-123" });
    const request = createRequest({ query: { uid: user.uid } });
    const response = createResponse();

    // mockReturnValueOnce => mock the return of function
    basedOnQuery.mockReturnValueOnce({ by: "uid", param: user.uid });
    findUser.uid.mockResolvedValueOnce([user]);

    await list(request, response);

    expect(basedOnQuery.mock.calls).toEqual([[request.query]]);
    expect(findUser.uid.mock.calls).toEqual([[request.query.uid]]);

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toBeCalledWith([user]);
  });

  it("should throw 500", async () => {
    const user = createAuth({ uid: "abc-123" });
    const request = createRequest({ query: { uid: user.uid } });
    const response = createResponse();

    // mockReturnValueOnce => mock the return of function
    basedOnQuery.mockReturnValueOnce({ by: "uid", param: user.uid });
    findUser.uid.mockRejectedValueOnce(new Error(500));

    await list(request, response);

    expect(logger.error.mock.calls).toEqual([
      ["Ocorreu um erro ao listar usuários", new Error("500")],
    ]);
    expect(response.status.mock.calls).toEqual([[500]]);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toBeCalledWith({ message: "500" });
  });
});

describe("Controller: create", () => {
  it("should create the user", async () => {
    const user = createAuth({ uid: "abc-123" });
    const request = createRequest({ body: user });
    const response = createResponse();

    createUser.mockResolvedValueOnce(user);

    await create(request, response);

    expect(createUser.mock.calls).toEqual([[user]]);

    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toBeCalledWith(user);
  });

  it("should throw 500", async () => {
    const user = createAuth({ uid: "abc-123" });
    const request = createRequest({ body: user });
    const response = createResponse();

    createUser.mockRejectedValueOnce(new Error(500));

    await create(request, response);

    expect(createUser.mock.calls).toEqual([[user]]);

    expect(logger.error.mock.calls).toEqual([
      ["Ocorreu um erro ao criar usuário", new Error(500)],
    ]);
    expect(response.status.mock.calls).toEqual([[500]]);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.json).toBeCalledWith({ message: "500" });
  });
});
