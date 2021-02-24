# 함수형 프로그래밍

## 용어정리

- 고차함수
  - 함수를 리턴하는 함수
- `Partial application`
  - = `partially applied funtion`
  - 부분 적용 함수
  - 고차함수 중 일부만 미리 실행시켜서, closure가 접근하는 `외부함수의 지역변수`만 업데이트 시켜두고자 할 때 사용한다.
  - ex) `mulFiveFunc = multiply(5);`


## 고차함수
> 함수를 리턴하는 함수

```ts
const add = (a: number): ((_: number) => number) => (b: number): number => a + b;
```

- type signature에도 parameter name을 넣어주어야 한다. 하지만 내 생각에는 딱히 의미가 필요없을 경우에는 `_` 활용하면 될듯하다.


## fat arrow `=>`

```ts
() => 3;
() => { return 3 };
() => (3); // 3
```

- 3번처럼 소괄호는 object를 return 할 때 유용하다.

```ts
export type Person = {name: string, age: number};
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
  [key: string]: string
}
```


