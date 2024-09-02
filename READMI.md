# Yellow Changer SDK

Easy to use Yellow Change API service

## Install

```
npm i yellow-changer-sdk
```

## Usage

Include nice-select2 script.

```js
import { YellowChanger } from 'yellow-changer-sdk'
```

Initialize the sdk.

```javascript
const yellowChanger = new YellowChanger({
	public_api_key: 'PUBLIC_KEY',
	secret_api_key: 'PRIVATE_KEY,
    base_url: ''
})
```

Using as import in webpack:

```javascript
new NiceSelect(document.getElementById('a-select'), { searchable: true })
```

## Instance method

-   `update()` : update nice-select items to match with source select
-   `focus()`: open dropdown list and focus on the search box if search is enabled
-   `disable()`: disable select
-   `enable()`: enable select
-   `destroy()`: destroy NiceSelect2 instance
-   `clear()`: clear all selected options

Full documentation and examples at [https://bluzky.github.io/nice-select2/](https://bluzky.github.io/nice-select2/).
