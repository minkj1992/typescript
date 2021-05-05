# clean code typescript
> https://738.github.io/clean-code-typescript/

## CH02 Naming

```ts
type User = {
  name: string;
  email?: string;
};

type IdUserMapType = Map<number, User>;

const users: IdUserMapType = new Map();

users.set(1, {name: 'minwook'});
users.set(2, {name: 'minho'});

for (const [id, user] of users) {
  console.log(id, user);
}
```

```ts
type Car = {
  make: string;
  model: string;
  color: string;
};

function render(car: Car): void {
  console.log(`${car.make}`);
}

const hyundai: Car = {
  make: 'hyundai',
  model: 'TS305',
  color: '#434142',
};

render(hyundai);
```

## CH03 Function

- 함수의 매개변수는 2개 혹은 그 이하가 이상적
- `Object.assign()`
```ts
type MenuOptions = {
  title?: string;
  body?: string;
  buttonText?: string;
  cancellable?: boolean;
};

const defaultMenuOptions: MenuOptions = {
  title: '순대국밥',
  body:
    '순대국밥이란, 돼지뼈를 우린다. 우린 육수에 순대를 넣어 끓여먹는 국밥형태의 음식',
  buttonText: '주문',
  cancellable: true,
};

function createMenu(menuOptions: MenuOptions) {
  const newMenuOptions = Object.assign(defaultMenuOptions, menuOptions);
  console.log(newMenuOptions);
}

createMenu({body: 'override test'});

```