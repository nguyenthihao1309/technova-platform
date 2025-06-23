import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthCheck(): { status: string; service: string } {
    return {
      status: 'ok',
      service: 'Users Service',
    };
  }
}
