import { ITravelRepository } from "../../domain/repositories/ITravelRepository";
import { Travel } from "../../domain/entities/Travel";
import { Photo } from "../../domain/value-objects/Photo";

export class MockTravelRepository implements ITravelRepository {
  private static instance: MockTravelRepository;
  private travels: Travel[] = [];

  private constructor() {}

  public static getInstance(): MockTravelRepository {
    if (!MockTravelRepository.instance) {
      MockTravelRepository.instance = new MockTravelRepository();
    }
    return MockTravelRepository.instance;
  }

  async save(travel: Travel): Promise<void> {
    this.travels.push(travel);
  }

  async findById(id: string): Promise<Travel | null> {
    return this.travels.find((travel) => travel.id === id) || null;
  }

  async findAll(): Promise<Travel[]> {
    return this.travels;
  }

  async findByUserId(userId: string): Promise<Travel[]> {
    return this.travels.filter((travel) => travel.user.id === userId);
  }

  async update(travel: Travel): Promise<void> {
    const index = this.travels.findIndex((t) => t.id === travel.id);
    if (index !== -1) {
      this.travels[index] = travel;
    }
  }

  async delete(id: string): Promise<void> {
    this.travels = this.travels.filter((travel) => travel.id !== id);
  }

  public reset(): void {
    this.travels = [];
  }
}
