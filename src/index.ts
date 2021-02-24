function hello(word = 'minwook'): string {
  return `Hello ${word}`;
}

const add = (a: number): ((_: number) => number) => (b: number): number =>
  a + b;

console.log(hello());
console.log(add(1)(2));
