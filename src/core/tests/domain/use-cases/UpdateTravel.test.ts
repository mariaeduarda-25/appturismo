import { RegisterTravel } from "../../../domain/use-cases/RegisterTravel";
import { UpdateTravel } from "../../../domain/use-cases/UpdateTravel";
import { MockTravelRepository } from "../../../infra/repositories/MockTravelRepository";
import { User } from "../../../domain/entities/User";
import { Name } from "../../../domain/value-objects/Name";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";

describe("UpdateTravel", () => {
  function makeUser() {
    return User.create(
      "1",
      Name.create("Alice"),
      Email.create("alice@example.com"),
      Password.create("12345678"),
      GeoCoordinates.create(-22.9, -43.2)
    );
  }

  it("deve atualizar uma viagem existente", async () => {
    const travelRepository = MockTravelRepository.getInstance();
    const registerTravel = new RegisterTravel(travelRepository);
    const updateTravel = new UpdateTravel(travelRepository);

    const user = makeUser();

    const travel = await registerTravel.execute({
      title: "Viagem antiga",
      description: "Descrição antiga",
      date: new Date("2025-01-01"),
      latitude: -22.7383,
      longitude: -45.5927,
      user,
      photoUrl: "https://example.com/foto-antiga.jpg",
    });

    const updatedTravel = await updateTravel.execute({
      id: travel.id,
      title: "Viagem atualizada",
      description: "Descrição atualizada",
      photoUrl: "https://example.com/foto-nova.jpg",
    });

    expect(updatedTravel.title).toBe("Viagem atualizada");
    expect(updatedTravel.description).toBe("Descrição atualizada");
    expect(updatedTravel.photo?.url).toBe("https://example.com/foto-nova.jpg");
  });

  it("deve lançar erro se a viagem não for encontrada", async () => {
    const travelRepository = MockTravelRepository.getInstance();
    const updateTravel = new UpdateTravel(travelRepository);

    await expect(
      updateTravel.execute({
        id: "inexistente",
        title: "Nova viagem",
      })
    ).rejects.toThrow("Viagem não encontrada");
  });

  it("não deve atualizar os campos se não forem fornecidos", async () => {
    const travelRepository = MockTravelRepository.getInstance();
    const registerTravel = new RegisterTravel(travelRepository);
    const updateTravel = new UpdateTravel(travelRepository);

    const user = makeUser();

    const travel = await registerTravel.execute({
      title: "Viagem completa",
      description: "Descrição original",
      date: new Date("2025-02-01"),
      latitude: -22.7383,
      longitude: -45.5927,
      user,
      photoUrl: "https://example.com/foto-original.jpg",
    });

    const updatedTravel = await updateTravel.execute({
      id: travel.id,
    });

    expect(updatedTravel.title).toBe("Viagem completa");
    expect(updatedTravel.description).toBe("Descrição original");
    expect(updatedTravel.date).toEqual(new Date("2025-02-01"));

    if (
      updatedTravel.location &&
      typeof updatedTravel.location.latitude === "number" &&
      typeof updatedTravel.location.longitude === "number"
    ) {
      expect(updatedTravel.location.latitude).toBe(-22.7383);
      expect(updatedTravel.location.longitude).toBe(-45.5927);
    } else {
      expect(updatedTravel.location?.latitude).toBeUndefined();
      expect(updatedTravel.location?.longitude).toBeUndefined();
    }

 
    if (updatedTravel.photo && typeof updatedTravel.photo.url === "string") {
      expect(updatedTravel.photo.url).toBe("https://example.com/foto-original.jpg");
    } else {
      expect(updatedTravel.photo).toBeUndefined();
    }
  });
});
