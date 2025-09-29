import { MockUserRepository } from '../../../infra/repositories/MockUserRepository';
import { User } from '../../../domain/entities/User';
import { Name } from '../../../domain/value-objects/Name';
import { Email } from '../../../domain/value-objects/Email';
import { Password } from '../../../domain/value-objects/Password';
import { GeoCoordinates } from '../../../domain/value-objects/GeoCoordinates';

describe('MockUserRepository', () => {
  it('should return null when finding a non-existent user by email', async () => {
    const userRepository = new MockUserRepository();

    const user = await userRepository.findByEmail('ghost@example.com');

    expect(user).toBeNull();
  });

  it('should save and find a user by id', async () => {
    const userRepository = new MockUserRepository();
    const user = User.create(
      '1',
      Name.create('John Doe'),
      Email.create('john.doe@example.com'),
      Password.create('password123'),
      GeoCoordinates.create(40.7128, -74.0060)
    );

    await userRepository.save(user);
    const foundUser = await userRepository.findById('1');

    expect(foundUser).not.toBeNull();
    expect(foundUser?.email.value).toBe('john.doe@example.com');
  });
});
