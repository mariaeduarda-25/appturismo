import { makeTravelUseCases } from '../../factories/makeTraveUsecases';

describe('maketravelUseCases', () => {
  it('should create and return all travel use cases', () => {
    const useCases = makeTravelUseCases();

    expect(useCases.registerTravel).toBeDefined();
    expect(useCases.updateTravel).toBeDefined();
    expect(useCases.deleteTravel).toBeDefined();
    expect(useCases.findTravel).toBeDefined();
  });
});