/* eslint-disable @typescript-eslint/no-wrapper-object-types */
type UnmockableTypes =
  | Number
  | Boolean
  | String
  | Symbol
  | BigInt
  | Date
  | RegExp
  | Generator;
/* eslint-enable @typescript-eslint/no-wrapper-object-types */

type MockObject<T> = {
  [K in keyof T]?: MockOverrides<T[K]>;
};

type MockOverrides<T> = T extends UnmockableTypes
  ? T
  : T extends Array<infer ItemType>
    ? MockOverrides<ItemType>[]
    : T extends (...args: infer Args) => infer ReturnType
      ? PossiblyMockedFn<Args, ReturnType>
      : T extends object
        ? T | MockObject<T>
        : never;

type PossiblyMockedFn<A extends unknown[], R> =
  | ((...args: A) => R)
  | jest.Mock<R, A>;

export function createMock<T extends object>(overrides?: MockOverrides<T>): T {
  return (overrides ?? {}) as T;
}

export function createMockList<T extends object>(
  count: number,
  mapFn?: (index: number) => MockOverrides<T>,
): T[] {
  if (!mapFn) {
    return Array.from({ length: count }, () => createMock<T>());
  }

  return Array.from({ length: count }, (_, idx) => createMock<T>(mapFn(idx)));
}
