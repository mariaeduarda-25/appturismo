import { Travel } from "../entities/Travel";

export interface ITravelRepository {
  save(travel: Travel): Promise<void>;
  findById(id: string): Promise<Travel | null>;
  findAll(): Promise<Travel[]>;
  findByUserId(userId: string): Promise<Travel[]>;
  update(record: Travel): Promise<void>;
  delete(id: string): Promise<void>;
}
