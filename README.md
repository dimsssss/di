# di

code for understanding Dependency Inejction Framework

## required
```json
  // tsconfig.json
  "experimentalDecorators": true,
  "emitDecoratorMetadata": true,  
```

## example
```ts
import { Injectable, createInstance } from "./container";

@Injectable()
class Logger {
  log(message: string) {
    console.log(`[LOG]: ${message}`);
  }
}

@Injectable()
class UserService {
  constructor(private logger: Logger) {}
  getUser(id: number) {
    this.logger.log(`Getting user with id: ${id}`);
    return `User ${id}`;
  }
}

@Injectable()
class UserController {
  constructor(
    private userService: UserService,
    private logger: Logger,
  ) {}
  getUser(id: number) {
    this.logger.log('UserController: getUser called');
    const user = this.userService.getUser(id);
    this.logger.log(`UserController: retrieved user: ${user}`);
  }
}

const userController = createInstance(UserController);
userController.getUser(1);

```

## result
```
[LOG]: UserController: getUser called
[LOG]: Getting user with id: 1
[LOG]: UserController: retrieved user: User 1

```

## TODO
- [ ] @Gurad
- [ ] @Interceptor
- [ ] @Pipe