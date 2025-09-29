import { FindUser } from '../../../domain/use-cases/FindUser';
import { RegisterUser } from '../../../domain/use-cases/RegisterUser';
import { MockUserRepository } from '../../../infra/repositories/MockUserRepository';

describe('FindUser', () => {
  beforeEach(() => {
    MockUserRepository.getInstance().reset();
  });
  it('Deve procurar o usuário pelo id', async () => {
    const userRepository = MockUserRepository.getInstance();
    const registerUser = new RegisterUser(userRepository);
    const findUser = new FindUser(userRepository);

    const user = await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      latitude: 40.7128,
      longitude: -74.0060,
    });

    const foundUser = await findUser.execute({ id: user.id });

    expect(foundUser).toBe(user);
  });

  it('Deve retornar null se o usuário não for encontrado', async () => {
    const userRepository = MockUserRepository.getInstance();
    const findUser = new FindUser(userRepository);

    const foundUser = await findUser.execute({ id: '1' });

    expect(foundUser).toBeNull();
  });
});