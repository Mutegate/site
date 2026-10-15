# Mutegate site

The project's website: what [Mutegate](https://github.com/Mutegate/mutegate)
is, and the guides for connecting agents and SDKs to a gateway. Static, built
with Vite and React, published to GitHub Pages on every push to `main`.

Mutegate is self-hosted only. The site has no accounts and no console; every
way forward ends in the gateway's repository.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/, with a page per guide for the static host
```

## Shared with the gateway

The connection guides, the theme and the mark are the gateway console's own,
copied into `src/shared` (and `public/favicon.svg`) by

```bash
npm run sync              # from Mutegate/mutegate@main, the released version
npm run sync -- --check   # CI: fail if they have moved on
```

They are not edited here: a change goes to the gateway first, then comes over
with `npm run sync`.

## License

Apache 2.0
