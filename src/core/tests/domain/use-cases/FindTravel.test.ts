import { FindTravel } from '../../../domain/use-cases/FindTravel';
import { MockTravelRepository } from '../../../infra/repositories/MockTravelRepository';
import { Travel } from '../../../domain/entities/Travel';
import { User } from '../../../domain/entities/User';
import { Name } from '../../../domain/value-objects/Name';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { GeoCoordinates } from '../../../domain/value-objects/GeoCoordinates';
import { Photo } from '../../../domain/value-objects/Photo';

describe('FindTravel', () => {
  it('deve encontrar uma viagem pelo id', async () => {
    const travelRepository = new MockTravelRepository();
    const findTravel = new FindTravel(travelRepository);

    const user = User.create(
      'user-1',
      Name.create('Maria Eduarda'),
      Email.create('maria@example.com'),
      Password.create('SenhaSegura123!'),
      GeoCoordinates.create(-23.5505, -46.6333)
    );

    const location = GeoCoordinates.create(-22.9068, -43.1729);
    const photo = Photo.create('https://example.com/foto.jpg');

    const travel = Travel.create(
      'travel-1',
      'Viagem para São Paulo',                       
      'Conhecendo os principais pontos turísticos', 
      new Date('2025-10-01'),                       
      location,                                     
      user,                                         
      photo                                         
    );

    await travelRepository.save(travel);

    const foundTravel = await findTravel.execute({ id: travel.id });

    expect(foundTravel).toBe(travel);
  });

  it('deve retornar null se a viagem não for encontrada', async () => {
    const travelRepository = new MockTravelRepository();
    const findTravel = new FindTravel(travelRepository);

    const foundTravel = await findTravel.execute({ id: 'nao-existe' });

    expect(foundTravel).toBeNull();
  });
});
