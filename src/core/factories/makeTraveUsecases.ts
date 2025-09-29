
import { ITravelRepository } from '../domain/repositories/ITravelRepository';
import { DeleteTravel } from '../domain/use-cases/DeleteTravel';
import { FindTravel } from '../domain/use-cases/FindTravel';
import { RegisterTravel } from '../domain/use-cases/RegisterTravel';
import { UpdateTravel } from '../domain/use-cases/UpdateTravel';
import { MockTravelRepository } from '../infra/repositories/MockTravelRepository';

export function makeTravelUseCases() {
  const travelRepository: ITravelRepository = new MockTravelRepository();

  const registerTravel= new RegisterTravel(travelRepository);
  const updateTravel= new UpdateTravel(travelRepository);
  const deleteTravel = new DeleteTravel(travelRepository);
  const findTravel= new FindTravel(travelRepository);

  return {
    registerTravel,
    updateTravel,
    deleteTravel,
    findTravel,
  };
}