import 'reflect-metadata';

type Constructor<T = any> = new (...args: any[]) => T;

const instanceMap = new WeakMap<Constructor, any>
const injectableTypes = new WeakMap<Constructor, Constructor[]>

export function Injectable() {
  return function(target: Constructor) {
    const paramTypes = Reflect.getMetadata('design:paramtypes', target) || [];
    injectableTypes.set(target, paramTypes);
  };
}

export function createInstance<T>(constructor: Constructor<T>): T {
  if (!injectableTypes.has(constructor)) {
    throw new Error(`Class ${constructor.name} is not injectable`);
  }

  if (instanceMap.has(constructor)) {
    return instanceMap.get(constructor);
  }

  const dependencies = injectableTypes.get(constructor)?.map((paramType: Constructor) => {
    if (!injectableTypes.has(paramType)) {
      throw new Error(`Dependency ${paramType.name} is not injectable`);
    }
    return createInstance(paramType);
  });

  if (dependencies) {
    const instance = new constructor(...dependencies);
    instanceMap.set(constructor, instance);
    return instance;
  } else {
    const instance = new constructor();
    instanceMap.set(constructor, instance);
    return instance;
  }
}
