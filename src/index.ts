function hello(word = 'minwook'): string {
  return `Hello ${word}`;
}

const add = (a: number): ((_: number) => number) => (b: number): number =>
  a + b;

console.log(hello());
console.log(add(1)(2));

export class IterableGenerator<T> implements Iterable<T> {
  constructor(private values: T[] = [], private currentIndex: number = 0) {}

  [Symbol.iterator] = function* (this: IterableGenerator<T>) {
    while (this.currentIndex < this.values.length) {
      yield this.values[this.currentIndex++];
    }
  };
}

for (const num of new IterableGenerator([1, 2, 3])) console.log(num);
for (const name of new IterableGenerator(['minwook', 'leo'])) console.log(name);
