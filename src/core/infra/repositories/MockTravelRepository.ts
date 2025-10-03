import { ITravelRepository } from "../../domain/repositories/ITravelRepository";
import { Travel } from "../../domain/entities/Travel";
import { Name } from "../../domain/value-objects/Name";
import { Photo } from "../../domain/value-objects/Photo";

export class MockTravelRepository implements ITravelRepository {
  private travels: Travel[] = [{
      id: "1",
      user: {name: Name.create("Rebecca")},
      date: new Date("06/01/25"),
      title: "Viagem para Campos do Jordão",
      photo:
        Photo.create("https://www.melhoresdestinos.com.br/wp-content/uploads/2022/11/teleferico-campos-jordao-capa.jpg"),
      description:
        "A viagem para Campos do Jordão foi uma experiência incrível! Indico o Hotel A e o restaurante B.",
    },
    {
      id: "2",
      user: {name: Name.create("Maria")},
      date: new Date("07/01/25"),
      title: "Viagem para Gramado",
      photo:
        Photo.create("https://blog.123milhas.com/wp-content/uploads/2022/12/aniversario-de-gramado-quatro-curiosidades-sobre-a-cidade-conexao123.jpg"),
      description:
        "Gramado é encantador! Não deixe de visitar a Rua Coberta e o Lago Negro.",
    },];

  async save(travel: Travel): Promise<void> {
    this.travels.push(travel);
  }

  async findById(id: string): Promise<Travel | null> {
    return this.travels.find(travel => travel.id === id) || null;
  }

  async findAll(): Promise<Travel[]> {
    return this.travels;
  }

  async findByUserId(userId: string): Promise<Travel[]> {
    return this.travels.filter(travel => travel.user.id === userId);
  }

  async update(travel: Travel): Promise<void> {
    const index = this.travels.findIndex(t => t.id === travel.id);
    if (index !== -1) {
      this.travels[index] = travel;
    }
  }

  async delete(id: string): Promise<void> {
    this.travels = this.travels.filter(travel => travel.id !== id);
  }
}
