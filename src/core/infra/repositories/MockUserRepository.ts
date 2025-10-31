import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User } from '../../domain/entities/User';
import { Password } from '../../domain/value-objects/Password';

export class MockUserRepository implements IUserRepository {
  private static instance: MockUserRepository;
  private users: User[] = [];

  private constructor() {}

  public static getInstance(): MockUserRepository {
    if (!MockUserRepository.instance) {
      MockUserRepository.instance = new MockUserRepository();
    }
    return MockUserRepository.instance;
  }

  async register(user: User): Promise<User> {
    const hashedPassword = `hashed_${user.password.value}`;
    const newUser = User.create(
      Math.random().toString(),
      user.name,
      user.email,
      Password.create(hashedPassword),
      user.location
    );
    this.users.push(newUser);
    return newUser;
  }

  async authenticate(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = `hashed_${password}` === user.password.value;
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email.value === email) || null;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  public reset(): void {
    this.users = [];
  }
}