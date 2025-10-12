import { FindAllTravel } from "../../../domain/use-cases/FindAllTravel";
import { RegisterTravel } from "../../../domain/use-cases/RegisterTravel";
import { MockTravelRepository } from "../../../infra/repositories/MockTravelRepository";
import { User } from "../../../domain/entities/User";
import { Name } from "../../../domain/value-objects/Name";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";

describe("FindAllTravel", () => {
  function makeUser() {
    return User.create(
      "user-1",
      Name.create("Maria Eduarda"),
      Email.create("maria@example.com"),
      Password.create("senhaSegura123"),
      GeoCoordinates.create(-23.55, -46.63)
    );
  }

  it("deve retornar todas as viagens cadastradas", async () => {
    const travelRepository = MockTravelRepository.getInstance();
    const registerTravel = new RegisterTravel(travelRepository);
    const findAllTravel = new FindAllTravel(travelRepository);

    const user = makeUser();

    travelRepository.reset();

    await registerTravel.execute({
      title: "Viagem 1",
      description: "Primeira viagem",
      date: new Date("2025-01-01"),
      latitude: -22.9,
      longitude: -43.2,
      user,
      photoUrl: "https://example.com/foto1.jpg",
    });

    await registerTravel.execute({
      title: "Viagem 2",
      description: "Segunda viagem",
      date: new Date("2025-02-01"),
      latitude: -23.0,
      longitude: -44.0,
      user,
      photoUrl: "https://example.com/foto2.jpg",
    });

    const travels = await findAllTravel.execute();

    expect(travels).not.toBeNull();
    expect(travels!.length).toBe(2);
    expect(travels![0].title).toBe("Viagem 1");
    expect(travels![1].title).toBe("Viagem 2");
  });

  it("deve retornar uma lista vazia se não houver viagens", async () => {
    const travelRepository = MockTravelRepository.getInstance();
    const findAllTravel = new FindAllTravel(travelRepository);

    travelRepository.reset();

    const travels = await findAllTravel.execute();

    expect(travels).toEqual([]);
  });
});
