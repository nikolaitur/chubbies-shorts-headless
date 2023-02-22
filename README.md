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

SESSION_SECRET="991867ba-ee74-4861-81e1-e73f402f58bf"
PUBLIC_STOREFRONT_API_TOKEN="6beb9ad94eb8033605576c7a2f498cb6"
PUBLIC_STOREFRONT_API_VERSION="2023-04"
PUBLIC_STORE_DOMAIN="chubbies.myshopify.com"
```

8. Run:

```
yarn install
```

9. Run:

```
yarn dev
```
