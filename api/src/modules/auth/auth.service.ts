import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  // constructor(private usersService: UserService) {}

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ username: username });
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return {
      ...user,
      password: undefined,
    };
  }
}
