import { LogoutUser } from '../../../domain/use-cases/LogoutUser';

describe('LogoutUser', () => {
  it('deve desconectar um usuário', async () => {
    const logoutUser = new LogoutUser();

    await expect(logoutUser.execute({ userId: '1' })).resolves.not.toThrow();
  });
});