import { Injectable, NestMiddleware } from '@nestjs/common';

import { Als } from './als.interface';

@Injectable()
export class AlsMiddleware implements NestMiddleware {
  constructor(private readonly als: Als) {}

  use(req: any, res: any, next: () => void) {
    const store = {
      user: req.headers['x-user-id'],
      tx: undefined,
    };

    this.als.run(store, () => {
      next();
    });
  }
}
