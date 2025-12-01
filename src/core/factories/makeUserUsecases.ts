import { IUserRepository } from '../domain/repositories/IUserRepository';
import { FindUser } from '../domain/use-cases/FindUser';
import { LoginUser } from '../domain/use-cases/LoginUser';
import { LogoutUser } from '../domain/use-cases/LogoutUser';
import { RegisterUser } from '../domain/use-cases/RegisterUser';
import {SupabaseUserRepository} from '../infra/repositories/supabaseUserRepository'
import { HybridUserRepository } from '../infra/repositories/HybridUserRepository';

import { MockUserRepository } from '../infra/repositories/MockUserRepository';

export function makeUserUseCases() {
  //const userRepository: IUserRepository = MockUserRepository.getInstance();
  const userRepository = process.env.EXPO_PUBLIC_USE_API
   ? HybridUserRepository.getInstance()
  : MockUserRepository.getInstance()
  const registerUser = new RegisterUser(userRepository);
  const loginUser = new LoginUser(userRepository);
  const logoutUser = new LogoutUser();

  const findUser = new FindUser(userRepository);

  return {
    registerUser,
    loginUser,
    logoutUser,
    findUser,
  };
}