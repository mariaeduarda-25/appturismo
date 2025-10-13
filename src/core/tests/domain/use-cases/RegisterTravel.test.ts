import { RegisterTravel } from "../../../domain/use-cases/RegisterTravel";
import { MockTravelRepository } from "../../../infra/repositories/MockTravelRepository";
import { User } from "../../../domain/entities/User";
import { Name } from "../../../domain/value-objects/Name";
import { Email } from "../../../domain/value-objects/Email";
import { Password } from "../../../domain/value-objects/Password";
import { GeoCoordinates } from "../../../domain/value-objects/GeoCoordinates";

describe("RegisterTravel", () => {
  it("deve registar uma nova viagem", async () => {
    const travelRepository = MockTravelRepository.getInstance();
    const registerTravel = new RegisterTravel(travelRepository);

    const user = User.create(
      "1",
      Name.create("Alice"),
      Email.create("alice@example.com"),
      Password.create("12345678"),
      GeoCoordinates.create(-22.9, -43.2)
    );

    const travel = await registerTravel.execute({
      title: "Viagem para Campos do Jordão",
      description: "Fim de semana nas montanhas",
      date: new Date("2025-09-01"),
      latitude: -22.7383,
      longitude: -45.5927,
      user,
      photoUrl: "https://example.com/foto.jpg",
    });

    expect(travel).toBeDefined();
    expect(travel.title).toBe("Viagem para Campos do Jordão");
    expect(travel.description).toBe("Fim de semana nas montanhas");
    expect(travel.user).toBe(user);
    expect(travel.location!.latitude).toBe(-22.7383);
    expect(travel.location!.longitude).toBe(-45.5927);
    expect(travel.photo?.url).toBe("https://example.com/foto.jpg");

    const foundTravel = await travelRepository.findById(travel.id);
    expect(foundTravel).toEqual(travel);
  });
});
