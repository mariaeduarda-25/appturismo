import { ITravelRepository } from "../../domain/repositories/ITravelRepository";
import { Travel } from "../../domain/entities/Travel";
import { Photo } from "../../domain/value-objects/Photo";

export class MockTravelRepository implements ITravelRepository {
  private static instance: MockTravelRepository;
  private travels: Travel[] = [{
        user: {
          id: "1",
          name: { value: "Maria" },
          email: { value: "teste@email.com" },
          password: { value: "123456" },
          location: { latitude: 0, longitude: 0 },
        },
        title: "Viagem para  a praia",
        description: "A viagem foi para a cidade de Angra dos Reis e durou 5 dias",
        photo: Photo.create("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOFb7FNWfwg-fEPAei7UvY78ayXWO_bVhSsA&s"),
        date: new Date("06/10/2025"),
        id: "1",
        location: {latitude: 0, longitude: 0}
      }];

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
