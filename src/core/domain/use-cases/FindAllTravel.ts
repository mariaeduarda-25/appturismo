import { Travel } from "../entities/Travel";
import { ITravelRepository } from "../repositories/ITravelRepository";

export class FindAllTravel {
  constructor(private readonly travelRepository: ITravelRepository) {}

  async execute(): Promise<Travel[] | null> {
    return this.travelRepository.findAll();
  }
}
