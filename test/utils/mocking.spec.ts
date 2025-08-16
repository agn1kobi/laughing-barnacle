import { createMock, createMockList } from 'test/utils/mocking';

class TestClass {
  constructor(
    public name: string,
    public age: number,
  ) {}

  getPossibleBirthYears(): [number, number] {
    const thisYear = new Date().getFullYear();
    return [thisYear - this.age, thisYear - this.age - 1];
  }

  async getNameAsync(): Promise<string> {
    return Promise.resolve(this.name);
  }
}

describe('Mocking utils', () => {
  describe('createMock', () => {
    describe('when no overrides are given', () => {
      it('should return a defined object', () => {
        const mock = createMock<TestClass>();

        expect(mock).toBeDefined();
      });
    });

    describe('when overrides are given', () => {
      const overrides: Parameters<typeof createMock<TestClass>>[0] = {
        age: 37,
        name: 'John Doe',
      };
      it('should return the overrides', () => {
        const mock = createMock<TestClass>(overrides);

        expect(mock).toBe(overrides);
      });
    });
  });

  describe('createMockList', () => {
    describe('when no overrides are given', () => {
      it('should return a list of objects', () => {
        const mockList = createMockList<TestClass>(2);

        expect(mockList).toBeDefined();
        expect(mockList).toHaveLength(2);
      });
    });

    describe('when an override mapping function with no index param is given', () => {
      const overrides: Parameters<typeof createMock<TestClass>>[0] = {
        age: 42,
        name: 'Jane Doe',
      };

      it('should return a list of the overrides', () => {
        const mockList = createMockList<TestClass>(2, () => overrides);

        expect(mockList).toHaveLength(2);
        expect(mockList[0]).toBe(overrides);
        expect(mockList[1]).toBe(overrides);
      });
    });

    describe('when an override mapping function with an index param is given', () => {
      it('should pass the index to the override fn', () => {
        const mockList = createMockList<TestClass>(2, idx => ({
          age: idx,
          name: idx.toString(),
        }));

        expect(mockList).toEqual([
          {
            age: 0,
            name: '0',
          },
          {
            age: 1,
            name: '1',
          },
        ]);
      });
    });
  });
});
