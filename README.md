# Vue Chill Code Input
**Easy Verification Code Input for your Vue projects**

## Why tho
- user friendly UI
- customizable length
- support for _copy & paste_
- _v-model_ API
- chill vibes
- written in Typescript

Currently working with Vue2 projects only. Vue3 support coming soon.

## Install
```bash
npm i vue-chill-code-input
```

## Usage
```vue
import VueChillCodeInput from 'vue-chill-code-input';

<VueChillCodeInput :fields="6" v-model="myValue"/>
```

## API

### Props
| name   | type   | required | default | options |
|--------|--------|----------|---------| --- |
| length | Number | false    | 4       |  |
| type | String | false    | text | text, number |
| autoFocus | Boolean | false    | false  |     |
| autoBlur | Boolean | false    | true  |     |

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
- early alpha version under heavy development
- any part of API can be changed

## Bugs and Features
[Check here](https://github.com/tskvrnda/vue-chill-code-input/issues)