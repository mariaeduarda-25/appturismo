import { Travel } from "../entities/Travel";
import { ITravelRepository } from "../repositories/ITravelRepository";

export class FindTravel {
  constructor(private readonly travelRepository: ITravelRepository) {}

  async execute(params: { id: string }): Promise<Travel | null> {
    return this.travelRepository.findById(params.id);
  }
}
