import { experimental_sx } from "@mui/material";
import { loadTeam } from "./middleware";

describe("test API calls", () => {
  it("load teams must return an array", async () => {
    //prepare
    const teamsJson = [
      {
        id: "123",
        promotion: "test",
        members: "we",
        name: "sure",
        url: "none"
      }
    ];
    // @ts-ignore
    jest.spyOn(global, "fetch").mockImplementation(() => {
      Promise.resolve({
        json: () => Promise.resolve(teamsJson)
      });
    });

    //execution
    const teams = await loadTeam();

    //asert
    expect(teams.length).toBe(1);
    expect(teams).toStrictEqual(teams);

    //@ts-ignore
    global.fetch.mockRestore();
  });
});
