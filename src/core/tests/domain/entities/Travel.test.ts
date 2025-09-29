import { Travel } from '../../../domain/entities/Travel';
import { GeoCoordinates } from '../../../domain/value-objects/GeoCoordinates';
import { Photo } from '../../../domain/value-objects/Photo';
import { User } from '../../../domain/entities/User';
import { Name } from '../../../domain/value-objects/Name';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';

describe('Travel', () => {
  it('deve criar uma entidade Travel válida', () => {
    const user = User.create(
      'u1',
      Name.create('Maria Eduarda'),
      Email.create('maria@example.com'),
      Password.create('SenhaSegura123!'), 
      GeoCoordinates.create(-23.5505, -46.6333) 
    );

    const location = GeoCoordinates.create(-22.9068, -43.1729); 
    const photo = Photo.create('https://example.com/travel.jpg');

    const travel = Travel.create(
      't1',
      'Viagem para São Paulo',
      'Conhecendo os principais pontos turísticos',
      new Date('2025-09-20'),
      location,
      user,
      photo
    );

    expect(travel.id).toBe('t1');
    expect(travel.title).toBe('Viagem para São Paulo');
    expect(travel.description).toBe('Conhecendo os principais pontos turísticos');
    expect(travel.date).toEqual(new Date('2025-09-20'));
    expect(travel.location.latitude).toBe(-22.9068);
    expect(travel.location.longitude).toBe(-43.1729);


    expect(travel.user.name.value).toBe('Maria Eduarda');
    expect(travel.user.email.value).toBe('maria@example.com');

  
    expect(travel.user.password).toBeDefined();
    expect(typeof (travel.user.password as any).value).toBe('string');

    expect(travel.user.location.latitude).toBe(-23.5505);
    expect(travel.user.location.longitude).toBe(-46.6333);

    expect(travel.photo?.url).toBe('https://example.com/travel.jpg');
  });

  it('deve lançar erro para coordenadas inválidas (value object)', () => {
    expect(() => GeoCoordinates.create(100, 200)).toThrow('Coordenadas geográficas inválidas');
  });

  it('deve lançar erro para URL de foto inválida (value object)', () => {
    expect(() => Photo.create('url-invalida')).toThrow('URL da foto inválida');
  });
});
