# gl-calculator

## About

Application deployed in the Heroku cloud platform at http://gl-calc.herokuapp.com/

Front app to api: https://github.com/annatrzeciak/gl-calc-api

Used: [Vue.js](https://vuejs.org/)

To state management: [Vuex](https://vuex.vuejs.org/)

Additional: [bootstrap](https://bootstrap-vue.org/), [stripe](https://stripe.com/) to handle payments, [fortawesome](https://fortawesome.com/) as main icons library, [JWT](https://jwt.io/) to generate and check auth tokens.

## Tests on the deployed version

It is possible to test on the deployed version http://gl-calc.herokuapp.com/

#### default account to test:

login: `test-user@example.com`  
password: `test-pass` 

or create own account

### Testing card

`4242 4242 4242 4242` Succeeds and immediately processes the payment  
`4000 0000 0000 3220`	3D Secure 2 authentication must be completed for a successful payment.  
`4000 0000 0000 9995`	Always fails with a decline code of insufficient_funds.

https://stripe.com/docs/payments/checkout/accept-a-payment

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
