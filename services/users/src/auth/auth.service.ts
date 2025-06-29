import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PublicUser } from './types/user.types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<PublicUser> {
    const { email, password } = createUserDto;

    // Check if the email already exists ---
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already in use.');
    }

    // Hash the password ---
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new user in the database ---
    const user = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    // Return the created user (omitting the password)

    const { password: _, ...result } = user;
    return result;
  }

  async login(loginDto: CreateUserDto): Promise<{ access_token: string }> {
    const { email, password } = loginDto;

    //find user = email
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid login information.');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
