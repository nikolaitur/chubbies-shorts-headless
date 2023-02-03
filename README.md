# Hydrogen template: Hello World

A minimal setup of components, queries and tooling to get started with Hydrogen.

## What's included

- ESLint
- Prettier
- Typescript
- Oxygen

## TODO

# SETUP

1. Get access to SOLO git and clone project
2. Create an accounts and join Bit network https://bit.cloud/
3. Create an accounts for npm https://www.npmjs.com/package/@solobrands/token-library
4. Run:

```
bit login
```

5. Run: npm login

```
npm login
```

6. Check your login status by running:

```
cat ~/.npmrc
```

7. Create _.env_ file

```
# These variables are only available locally in MiniOxygen

SESSION_SECRET="foobar"
PUBLIC_STOREFRONT_API_TOKEN="5ff569c020683384058cc63785c3cb0a"
PUBLIC_STOREFRONT_API_VERSION="2023-01"
PUBLIC_STORE_DOMAIN="isleboards.myshopify.com"
```

8. Run:

```
yarn install
```

9. Run:

```
yarn dev
```
