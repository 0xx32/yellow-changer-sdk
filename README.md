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
})
```

## Instance method

-   `getAllRates()` : Returns all possible exchange rates
-   `getDestinationList()`: Returns all possible exchange destinations
-   `getRatesInDirection()`: Returns rates in a certain direction
-   `getTradeInfo()`: Returns all information about transaction
-   `createTrade()`: Create new trade and returns trade info
