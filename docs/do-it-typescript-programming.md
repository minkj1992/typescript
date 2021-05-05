# Do it 타입스크립트 프로그래밍

## 용어정리

- 고차함수
  - 함수를 리턴하는 함수
- `Partial application`

  - = `partially applied funtion`
  - 부분 적용 함수
  - 고차함수 중 일부만 미리 실행시켜서, closure가 접근하는 `외부함수의 지역변수`만 업데이트 시켜두고자 할 때 사용한다.
  - ex) `mulFiveFunc = multiply(5);`

- `fold`
  - T[] => T
  - 배열과 callback을 받아서, fold(접어서) 결과를 제공한다.
  - 접는 행위는 callback이 담당한다.
- 순수함수(`pure function`)
  - `side-effect`가 없는 함수
    - exception
    - readonly or const args
    - no global variable
    - no stdin/stdout (print or console.log)
    - no callback function in function body
    - no async(Promise) in body
  - <-> `impure-function`
- 가변 인수(`variadic arguments`)
  - 함수 인수의 갯수를 제한하지 않는 것
  - ex) `export const mergeArray = <T>(...arrays: readonly T[][]):T[] => {}`
- `iterable`
  - `iterator`를 구현하고 있는 object(class)
  - 미리 예약된 문법으로 `iterator`를 반환한다.
  - 미리 예약된 문법 ex) `__iter__`, `[Symbol.iterator]()` ...
  - `for ... of` 따위의 문법에 활용가능
- `iterator`
  - 주로 `next()`라는 메서드를 제공한다.
  - `next() => value, done`
- `generator`
  - `function* `키워드로 만든 함수
  - body에 `yield` 를 포함한다.
    - `yield`는 `iterator`를 자동으로 만들어줍니다. 즉 generator는 `.next()` 활용가능
    - `yield`는 `iterable` 역활도 수행하는 키워드입니다. 즉 `for ... of` 활용 가능
  - `semi-coroutine`(세미 코루틴)을 활용해 싱글스레드가 멀티 스레드 처럼 동작하도록 보이게 만든다.
- `coroutine`

  - 애플리케이션 레벨의 스레드(lightweight)
  - 코루틴 또한 스레드의 일종이므로, **일정 주기에 따라 자동**으로 **반복** 실행된다.

- `semi-coroutine`

  - **반복**해서 실행되지만, **자동으로 실행되지는 못함**
  - next()를 호출 할때마다, 실행됩니다.

- `map`
  - = `mapping`
  - 함수형 프로그래밍에서 일대일 대응관계를 뜻하는 함수 타입 (아래의 f가 map 타입)
  - (x: T) ~-> f -> (y: R)
  -
- `arity`(애리티)
  - 함수에서 매개변수의 갯수
  - f() : arity가 0인 함수
- `curry`(커리)

  - 함수형 프로그래밍에서 함수와 인자를 다루는 방법 일종
  - curry는 partial application의 특수한 형태
  - partial application이 미리 전달받아둘 수 있는 인자의 수에 제한이 없다면 curry는 1개만 가능하다.
  - 기본동작은, 원래 함수가 요구하는 인자의 수(Function.arity, 또는 Function.length)가 모두 전달될 때까지 재귀적으로 curry 함수를 생성한다.
  - 함수 호출에 필요한 인자가 모두 전달되면 curry 함수를 만들지 않고 원래의 함수를 호출한다.

- curry 정의

  - source by [rhostem](https://blog.rhostem.com/posts/2017-04-20-curry-and-partial-application)

- `closure`

  - 고차 함수의 body에 선언되는 변수들의 유효범위(=`persistence scope`, 지속되는 유효범위)
  - 고차함수가 값으로 evaluation 되기 전까지는, 자유변수(`free variable`)들이 메모리에서 해제 되지 않으며 이 때문에 closure를 지속되는 유효 범위라고 함.

- `compose`함수
  - `<T,R>(...functions: readonly Function[]): Function => (x:T): (T) => R => {}`
  - 인자로 함수 배열을 받아, 함수들을 조합해 매개변수 x를 입력받는 1차 함수를 반환하는 고차함수
  - 함수는 callstack에 의해 호출 되기 때문에, 내부적으로 인자로 받은 함수들을 reverse() 시켜서 실행한다.

```js
function curry(fn, arity = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      let args = prevArgs.concat([nextArg]);

      if (args.length >= arity) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}
```

- curry 활용 예제

```js
const sum = (a, b, c, d, e) => a + b + c + d + e;
const curriedSum = curry(sum);

sum(1, 2, 3, 4, 5) === curriedSum(1)(2)(3)(4)(5); // true
```

- `pointless function`
  - 포인트가 없는 함수
  - 함수 조합을 고려해 설계한 함수
  - ex) map()

## 함수형 프로그래밍

### 고차함수

> 함수를 리턴하는 함수

```ts
const add = (a: number): ((_: number) => number) => (b: number): number =>
  a + b;
```

- type signature에도 parameter name을 넣어주어야 한다. 하지만 내 생각에는 딱히 의미가 필요없을 경우에는 `_` 활용하면 될듯하다.

### fat arrow `=>`

```ts
() => 3;
() => {
  return 3;
};
() => 3; // 3
```

- 3번처럼 소괄호는 object를 return 할 때 유용하다.

```ts
export type Person = {name: string; age: number};
export const makePerson = (name: string, age = 10): Person => ({
  name: age,
});
```

symbol 타입(변수)으로 할당하고 싶을 때는 다음과 같이 사용합니다.

```ts
export type Person = {name: string; age: number};
const makeObject = ({name, age}: Person) => ({[name]: age});
```

`{[key]:value}` 형태의 타입을 `indexable type` 이라고 합니다.

```ts
type MyIndexableType = {
  [key: string]: string;
};
```

## OOP

## 클래스 메서드

```ts
export class A {
  value = 1;
  method: () => void = function (): void {
    console.log(`value: ${this.value}`);
  };
}
```

아래 처럼 ts에서의 class method는 function 생략 가능합니다.

```ts
export class B {
  constructor(public value: number = 1) {}
  method(): void {
    console.log(`value: ${this.value}`);
  }
```

- static method는 아래처럼 활용합니다.

```ts
export class C {
  static whoAmI(): string {
    return "I'm c";
  }
}
```

## 프로그래밍 기법

- 함수형 프로그래밍
- 선언형 프로그래밍
- 명령형 프로그래밍

## ch06 iterator & generator

- generator 생성시 사용하는 `function*`는 단일 키워드입니다. 즉 `fat arrow`에서는 사용할 수 없습니다.
  - 참고로 function과 \* 사이에는 공백이 (무한히) 있어도 되고, 없어도 상관없습니다.

### `yield`

```ts

```

- 아래는 generator를 활용해 iterator를 쉽고 깔끔하게 수정합니다.

```ts
export class IterableGenerator<T> implements Iterable<T> {
  constructor(private values: T[] = [], private currentIndex: number = 0) {}

  [Symbol.iterator] = function* (this: IterableGenerator<T>) {
    while (this.currentIndex < this.values.length) {
      yield this.values[this.currentIndex++];
    }
  };
}
```

### `yield*`

- collection yield
- 배열, 또 다른 generator 할당 가능

### `.next(값)`

- 넣어주게 되면 `var = yield var` 처럼, yield의 return 값을 전달가능하다.

## map

```js
const map = f => a => a.map(f);
const square = v => v * v;
const squaredMap = map(square);
squaredMap([10, 20]) > [100, 400];
```
