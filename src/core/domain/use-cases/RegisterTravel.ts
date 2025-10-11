import { Travel } from "../entities/Travel";
import { ITravelRepository } from "../repositories/ITravelRepository";
import { GeoCoordinates } from "../value-objects/GeoCoordinates";
import { User } from "../entities/User";
import { Photo } from "../value-objects/Photo";

export class RegisterTravel {
  constructor(private readonly travelRepository: ITravelRepository) {}

  async execute(params: {
    title: string;
    description: string;
    date: Date;
    latitude: number;
    longitude: number;
    user: User;
    photoUrl?: string;
  }): Promise<Travel> {
    const { title, description, date, latitude, longitude, user, photoUrl } = params;

    const location = GeoCoordinates.create(latitude, longitude);
    const photo = photoUrl ? Photo.create(photoUrl) : undefined;

    const travel = Travel.create(
      Math.random().toString(), 
      title,
      description,
      date,
      user,
      location,
      photo
    );

    await this.travelRepository.save(travel);

    return travel;
  }
}
