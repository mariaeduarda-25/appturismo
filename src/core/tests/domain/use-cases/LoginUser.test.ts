import { LoginUser } from '../../../domain/use-cases/LoginUser';
import { RegisterUser } from '../../../domain/use-cases/RegisterUser';
import { MockUserRepository } from '../../../infra/repositories/MockUserRepository';

describe('LoginUser', () => {
  beforeEach(() => {
    MockUserRepository.getInstance().reset();
  });
  it('should login a user', async () => {
    const userRepository = MockUserRepository.getInstance();
    const registerUser = new RegisterUser(userRepository);
    const loginUser = new LoginUser(userRepository);

    await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      latitude: 40.7128,
      longitude: -74.006,
    });

    const user = await loginUser.execute({
      email: 'john.doe@example.com',
      password: 'password123',
    });

    expect(user).toBeDefined();
    expect(user.email.value).toBe('john.doe@example.com');
  });

  it('deve lançar um erro para usuário inexistente', async () => {
    const userRepository = MockUserRepository.getInstance();
    const loginUser = new LoginUser(userRepository);

    await expect(
      loginUser.execute({
        email: 'non.existent@example.com',
        password: 'password123',
      })
    ).rejects.toThrow('Credenciais inválidas');
  });

  it('deve lançar um erro para senha incorreta', async () => {
    const userRepository = MockUserRepository.getInstance();
    const registerUser = new RegisterUser(userRepository);
    const loginUser = new LoginUser(userRepository);

    await registerUser.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      latitude: 40.7128,
      longitude: -74.006,
    });

    await expect(
      loginUser.execute({
        email: 'john.doe@example.com',
        password: 'wrongpassword',
      })
    ).rejects.toThrow('Credenciais inválidas');
  });
});