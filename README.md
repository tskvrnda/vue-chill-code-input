# Vue Chill Code Input
**Easy Verification Code Input for your Vue projects**

[![npm](https://img.shields.io/npm/v/vue-chill-code-input)](https://www.npmjs.com/package/vue-chill-code-input)
[![build](https://github.com/tskvrnda/vue-chill-code-input/actions/workflows/build.yml/badge.svg)](https://github.com/tskvrnda/vue-chill-code-input/actions/workflows/npm-publish.yml)


## Why tho
- user friendly UI
- support for **copy & paste**
- **v-model**
- **typescript** support
- customizable length
- basically behaves like a standard input

Currently working with Vue2 projects only. Vue3 support coming soon.

## Install
```bash
npm i vue-chill-code-input
```

## Usage
```vue
import VueChillCodeInput from 'vue-chill-code-input';

<VueChillCodeInput :length="6" v-model="myValue"/>
```

## API

### Props
| name      | type   | required | default | options           |
|-----------|--------|----------|---------|-------------------|
| length    | Number | false    | 4       |                   |
| type      | String | false    | text    | text, number, tel |
| password  | Boolean | false    | false   |                   |
| autoFocus | Boolean | false    | false   |                   |
| autoBlur  | Boolean | false    | true    |                   |

### Events
| name   | when   | data | 
|--------|--------|----------|
| done | on fields filled | input value |
| blur | when blurred | - |

## Methods
| name   | desc    | 
|--------|--------|
| focus | focuses on input (on the first column) |
| blur | blurs input |
| clear | clear input |

## Warning
- early beta version under heavy development
- any part of API can be changed

## Bugs and Features
[Check here](https://github.com/tskvrnda/vue-chill-code-input/issues)