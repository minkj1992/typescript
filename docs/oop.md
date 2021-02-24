# OOP

## 용어정리

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