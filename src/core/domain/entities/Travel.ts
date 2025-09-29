import { GeoCoordinates } from '../value-objects/GeoCoordinates';
import { User } from './User';
import { Photo } from '../value-objects/Photo';

export class Travel {
  private constructor(
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly date: Date,
    readonly location: GeoCoordinates,
    readonly user: User, 
    readonly photo?: Photo
  ) {}

  static create(
    id: string,
    title: string,
    description: string,
    date: Date,
    location: GeoCoordinates,
    user: User,
    photo?: Photo
  ): Travel {
    return new Travel(id, title, description, date, location, user, photo);
  }
}
