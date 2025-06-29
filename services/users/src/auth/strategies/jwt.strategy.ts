import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicUser } from '../types/user.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in the environment variables!');
    }
    super({
      /*
       *Tell Passport how to find the token.
       *It will look in the Authorization header with the format Bearer <token>
       */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Skip checking for expired tokens, Passport will handle it automatically
      ignoreExpiration: false,
      // Provide the secret key so Passport can verify the token's signature.
      secretOrKey: jwtSecret,
    });
  }

  /*
   * This method is called by Passport after successfully verifying the JWT.
   * The decoded payload is passed here.
   */
  async validate(payload: { sub: string; email: string }): Promise<PublicUser> {
    //In the payload, we have saved `sub` as the user's id.
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });

    //If the user is not found, the user may have been deleted after the token was issued
    if (!user) {
      throw new UnauthorizedException('Can not found user!');
    }

    //Remove password before returning
    const { password, ...result } = user;

    //Anything returned from this function will be received by NestJS attach to `request.user`.
    return result;
  }
}
