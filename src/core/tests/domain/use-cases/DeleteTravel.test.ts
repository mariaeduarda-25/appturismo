import { DeleteTravel } from '../../../domain/use-cases/DeleteTravel';
import { MockTravelRepository } from '../../../infra/repositories/MockTravelRepository';
import { Travel } from '../../../domain/entities/Travel';
import { User } from '../../../domain/entities/User';
import { Name } from '../../../domain/value-objects/Name';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { GeoCoordinates } from '../../../domain/value-objects/GeoCoordinates';
import { Photo } from '../../../domain/value-objects/Photo';

describe('DeleteTravel', () => {
  it('deve excluir uma viagem existente', async () => {
    const travelRepository = MockTravelRepository.getInstance();
    const deleteTravel = new DeleteTravel(travelRepository);

    const user = User.create(
      'user-1',
      Name.create('Maria Eduarda'),
      Email.create('maria@example.com'),
      Password.create('SenhaSegura123!'),
      GeoCoordinates.create(-23.5505, -46.6333)
    );

    const travel = Travel.create(
      'travel-1',
      'Viagem para São Paulo',
      'Conhecendo os principais pontos turísticos',
      new Date('2025-10-01'),
      user,
      GeoCoordinates.create(-22.9068, -43.1729),
      Photo.create('https://example.com/foto.jpg')
    );

    await travelRepository.save(travel);

    await deleteTravel.execute({ id: travel.id });

    const foundTravel = await travelRepository.findById(travel.id);
    expect(foundTravel).toBeNull();
  });

  it('deve lançar erro se a viagem não for encontrada', async () => {
    const travelRepository = MockTravelRepository.getInstance();
    const deleteTravel = new DeleteTravel(travelRepository);

    await expect(deleteTravel.execute({ id: 'nao-existe' }))
      .rejects.toThrow('Viagem não encontrada');
  });
});
