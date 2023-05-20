export function LogDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Antes da execução do método ${propertyKey}`);
    const result = originalMethod.apply(this, args);
    console.log(`Depois da execução do método ${propertyKey}`);

    return result;
  };

  return descriptor;
}
