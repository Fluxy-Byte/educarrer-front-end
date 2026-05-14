import { getUserByEmail } from "@/lib/services/user";
import { UserDTO } from "@/lib/interfaces/user.interface";

describe("getUserByEmail", () => {

  it("deve retornar um objeto UserDTO", async () => {

    const result: UserDTO = await getUserByEmail("gabriel@teste.com");

    expect(result).toBeDefined();

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("email");

    expect(result.email).toBe("gabriel@teste.com");

  });

});