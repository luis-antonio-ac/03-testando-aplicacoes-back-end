import { list } from "./users.controller";
import { createResponse } from "utils/create";

import logger from "@jsassertivo/cli/src/utils/logger";
jest.mock("@jsassertivo/cli/src/utils/logger");

import { findAll } from "services/users/find";
jest.mock("services/users/find");

afterEach(() => {
  jest.clearAllMocks();
});

describe("Controllers: users", () => {
  it("should return the list of users", async () => {
    findAll.mockResolvedValueOnce([]);

    const response = createResponse();

    await list(null, response);

    expect(findAll.mock.calls).toEqual([[]]);
    expect(response.json).toBeCalledWith([]);
    expect(response.json).toHaveBeenCalledTimes(1);
  });

  it("should return 500 because findAll throw an error", async () => {
    const errorMessage = "Ocorreu um erro ao listar usuários";
    findAll.mockRejectedValueOnce(new Error(errorMessage));

    const response = createResponse();

    await list(null, response);

    expect(findAll.mock.calls).toEqual([[]]);
    expect(logger.error.mock.calls).toEqual([
      [errorMessage, new Error(errorMessage)],
    ]);
    expect(response.json).toBeCalledWith({ message: errorMessage });
    expect(response.json).toHaveBeenCalledTimes(1);
  });
});
