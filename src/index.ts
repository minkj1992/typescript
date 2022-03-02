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
  const obj: any = {x: 10};
  console.log(obj);
}

createMenu({body: 'override test'});
