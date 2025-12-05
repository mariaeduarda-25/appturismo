import NetInfo from '@react-native-community/netinfo';
import { ITravelRepository } from '../../domain/repositories/ITravelRepository';
import { Travel } from '../../domain/entities/Travel';
import { SupabaseTravelRepository } from './supabaseTravelRepository';
import { SQLiteTravelRepository } from '../sqlite/SQLiteTravelRepository';

export class HybridTravelRepository implements ITravelRepository {
  private static instance: HybridTravelRepository;
  private onlineRepo: ITravelRepository;
  private offlineRepo: ITravelRepository;

  private constructor() {
    this.onlineRepo = SupabaseTravelRepository.getInstance();
    this.offlineRepo = SQLiteTravelRepository.getInstance();
  }

  public static getInstance(): HybridTravelRepository {
    if (!HybridTravelRepository.instance) {
      HybridTravelRepository.instance = new HybridTravelRepository();
    }
    return HybridTravelRepository.instance;
  }

  private async isOnline(): Promise<boolean> {
    const state = await NetInfo.fetch();
    return state.isConnected ?? false;
  }

  async save(travel: Travel): Promise<void> {
    if (await this.isOnline()) {
      try {
        await this.onlineRepo.save(travel);
        // await this.offlineRepo.save(travel);
      } catch (error) {
        console.warn('Online save failed, falling back to offline.', error);
        // await this.offlineRepo.save(travel);
      }
    } else {
      await this.offlineRepo.save(travel);
    }
  }

  async findById(id: string): Promise<Travel | null> {
    if (await this.isOnline()) {
      return this.onlineRepo.findById(id);
    } else
      return this.offlineRepo.findById(id);
  }

  async findAll(): Promise<Travel[]> {
    if (await this.isOnline()) {
      return this.onlineRepo.findAll();
    } else
      return this.offlineRepo.findAll();
  }

  async findByUserId(userId: string): Promise<Travel[]> {
    if (await this.isOnline()) {
      return this.onlineRepo.findByUserId(userId);
    } else
      return this.offlineRepo.findByUserId(userId);
  }

  async update(travel: Travel): Promise<void> {
    if (await this.isOnline()) {
      try {
        await this.onlineRepo.update(travel);
        // await this.offlineRepo.update(travel);
      } catch (error) {
        console.warn('Online update failed, falling back to offline.', error);
        // await this.offlineRepo.update(travel);
      }
    } else {
      await this.offlineRepo.update(travel);
    }
  }

  async delete(id: string): Promise<void> {
    if (await this.isOnline()) {
      try {
        await this.onlineRepo.delete(id);
        // await this.offlineRepo.delete(id);
      } catch (error) {
        console.warn('Online delete failed, falling back to offline.', error);
        // await this.offlineRepo.delete(id);
      }
    } else {
      await this.offlineRepo.delete(id);
    }
  }
}