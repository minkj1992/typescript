# 바닐라 TypeScript 시작하기 
> [How To Set Up a New TypeScript Project](https://www.digitalocean.com/community/tutorials/typescript-new-project)

## setup

- TypeScript에는 `tsc`와 `tsserver`라는 두 가지 바이너리가 있다.
  - `tsc`: Typesciprt 컴파일러
  - `tsserver`: runs TypeScript compiler in background

- tsconfig.json 생성
```bash
tsc --init
```

- compile
```bash
$ tsc 
$ tsc -w
```

## tslint

```bash
$ yarn add tslint typescript --dev
$ npx tslint --init
```

- Airbnb 설정
```bash
$ yarn add tslint-config-airbnb  
```

```json
# tslint.json
{
  "defaultSeverity": "error",
  "extends": "tslint-config-airbnb",
  "jsRules": {},
  "rules": {
    "eofline": false
  },
  "rulesDirectory": []
}
```

## gts 사용
> https://github.com/google/gts

- `Google TypeScript Style(gts)`는 새로운 TypeScript 프로젝트를 보다 쉽게 만들어줌
  - linting
  - tsconfig.json
  - ...


- 세팅
```bash
$ npx gts init
```

다음 명령어를 통해 package.json, tsconfig.json, tslint 기능을 사용할 수 있습니다.

- gts tslint 설정 확장
```json
{
  "defaultSeverity": "error",
  "extends": [
    "./node_modules/gts/tslint.json"
  ],
  "jsRules": {},
  "rules": {},
  "rulesDirectory": []
}
```

- gts with oh-my-zsh 이슈
  - 기본적으로 oh my zsh는 git tag에 대한 alias를 제공한다. 이때문에 gts alias를 제거해주어야한다.

```
vim ~/.oh-my-zsh/plugins/git/git.plugin.zsh      
# alias gts='git tag -s' 제거 또는 주석

source ~/.zshrc
```