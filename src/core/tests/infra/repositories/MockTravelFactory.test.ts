
import { MockTravelRepository } from "../../../infra/repositories/MockTravelRepository";
import { Travel } from "../../../domain/entities/Travel";
import { User } from "../../../domain/entities/User";
import { Name } from "../../../domain/value-objects/Name";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";
import { Photo } from "../../../domain/value-objects/Photo";

describe("MockTravelRepository", () => {
  it("não deve lançar erro ao atualizar uma viagem inexistente", async () => {
    const travelRepository = MockTravelRepository.getInstance();

    const user = User.create(
      "1",
      Name.create("Alice"),
      Email.create("alice@example.com"),
      Password.create("12345678"),
      GeoCoordinates.create(-22.9, -43.2)
    );

    const travel = Travel.create(
      "1",
      "Viagem Fantasma",
      "Essa viagem não existe no repositório",
      new Date("2025-01-01"),
      user,
      GeoCoordinates.create(-22.7383, -45.5927),
      Photo.create("https://example.com/foto.jpg")
    );

    await expect(travelRepository.update(travel)).resolves.not.toThrow();
  });
});
