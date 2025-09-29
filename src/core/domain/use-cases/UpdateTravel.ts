import { Travel } from "../entities/Travel";
import { ITravelRepository } from "../repositories/ITravelRepository";
import { GeoCoordinates } from "../value-objects/GeoCoordinates";
import { User } from "../entities/User";
import { Photo } from "../value-objects/Photo";

export class UpdateTravel {
  constructor(private readonly travelRepository: ITravelRepository) {}

  async execute(params: {
    id: string;
    title?: string;
    description?: string;
    date?: Date;
    location?: { latitude: number; longitude: number };
    user?: User;
    photoUrl?: string;
  }): Promise<Travel> {
    const { id, title, description, date, location, user, photoUrl } = params;

    const travel = await this.travelRepository.findById(id);

    if (!travel) {
      throw new Error("Viagem não encontrada");
    }

    const newTitle = title || travel.title;
    const newDescription = description || travel.description;
    const newDate = date || travel.date;
    const newLocation = location
      ? GeoCoordinates.create(location.latitude, location.longitude)
      : travel.location;
    const newUser = user || travel.user;
    const newPhoto = photoUrl ? Photo.create(photoUrl) : travel.photo;

    const updatedTravel = Travel.create(
      travel.id,
      newTitle,
      newDescription,
      newDate,
      newLocation,
      newUser,
      newPhoto
    );

    await this.travelRepository.update(updatedTravel);

    return updatedTravel;
  }
}
