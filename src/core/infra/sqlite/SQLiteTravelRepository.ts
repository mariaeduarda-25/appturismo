import DatabaseConnection from './connection';
import { ITravelRepository } from '../../domain/repositories/ITravelRepository';
import { Travel } from '../../domain/entities/Travel';
import { Name } from '../../domain/value-objects/Name';
import { Photo } from '../../domain/value-objects/Photo';
import { GeoCoordinates } from '../../domain/value-objects/GeoCoordinates';
import { User } from '../../domain/entities/User';
import { v4 as uuid } from 'uuid';

export class SQLiteTravelRepository implements ITravelRepository {
  private static instance: SQLiteTravelRepository;

  private constructor() {}

  public static getInstance(): SQLiteTravelRepository {
    if (!SQLiteTravelRepository.instance) {
      SQLiteTravelRepository.instance = new SQLiteTravelRepository();
    }
    return SQLiteTravelRepository.instance;
  }

  async save(travel: Travel): Promise<void> {
    const db = await DatabaseConnection.getConnection();
    const id = travel.id || uuid();
    
    await db.runAsync(
      'INSERT INTO travels (id, title, description, date, user_id, latitude, longitude, photo_url, sync_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      id,
      travel.title,
      travel.description,
      travel.date.toISOString(),
      travel.user?.id || '',
      travel.location?.latitude || 0,
      travel.location?.longitude || 0,
      travel.photo?.url || '',
      'pending_create'
    );
  }

  async findById(id: string): Promise<Travel | null> {
    const db = await DatabaseConnection.getConnection();
    const travelRow = await db.getFirstAsync<any>(
      'SELECT * FROM travels WHERE id = ?',
      id
    );

    if (travelRow) {
      return this.mapRowToTravel(travelRow);
    }
    return null;
  }

  async findAll(): Promise<Travel[]> {
    const db = await DatabaseConnection.getConnection();
    const travelRows = await db.getAllAsync<any>('SELECT * FROM travels');
    return travelRows.map(travelRow => this.mapRowToTravel(travelRow));
  }

  async findByUserId(userId: string): Promise<Travel[]> {
    const db = await DatabaseConnection.getConnection();
    const travelRows = await db.getAllAsync<any>(
      'SELECT * FROM travels WHERE user_id = ?',
      userId
    );
    return travelRows.map(travelRow => this.mapRowToTravel(travelRow));
  }

  async update(travel: Travel): Promise<void> {
    const db = await DatabaseConnection.getConnection();
    
    await db.runAsync(
      "UPDATE travels SET title = ?, description = ?, date = ?, latitude = ?, longitude = ?, photo_url = ?, sync_status = CASE WHEN sync_status = 'synced' THEN 'pending_update' ELSE sync_status END WHERE id = ?",
      travel.title,
      travel.description,
      travel.date.toISOString(),
      travel.location?.latitude || 0,
      travel.location?.longitude || 0,
      travel.photo?.url || '',
      travel.id
    );
  }

  async delete(id: string): Promise<void> {
    const db = await DatabaseConnection.getConnection();
    await db.runAsync("INSERT INTO sync_log (entity_type, entity_id, action) VALUES ('travel', ?, 'delete')", id);
    await db.runAsync('DELETE FROM travels WHERE id = ?', id);
  }

  private mapRowToTravel(row: any): Travel {
    return Travel.create(
      row.id,
      row.title,
      row.description,
      new Date(row.date),
      { id: row.user_id } as Partial<User>,
      row.latitude && row.longitude ? GeoCoordinates.create(row.latitude, row.longitude) : undefined,
      row.photo_url ? Photo.create(row.photo_url) : undefined
    );
  }
}
