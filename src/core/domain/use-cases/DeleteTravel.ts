import { ITravelRepository } from "../repositories/ITravelRepository";

export class DeleteTravel {
  constructor(private readonly travelRepository: ITravelRepository) {}

  async execute(params: { id: string }): Promise<void> {
    const { id } = params;

    const travel = await this.travelRepository.findById(id);

    if (!travel) {
      throw new Error("Viagem não encontrada");
    }

    await this.travelRepository.delete(id);
  }
}
