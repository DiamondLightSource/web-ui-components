# Web UI Components Library

![Code CI](https://github.com/DiamondLightSource/web-ui-components/actions/workflows/node.js.yml/badge.svg) ![Apache Licence](https://img.shields.io/badge/License-Apache%202.0-blue.svg)

Source code  |  https://github.com/DiamondLightSource/web-ui-components|
-------------|---------------------------------------------------------|

Generic components for React based Diamond web apps

## Installing

```sh
    yarn add @diamondlightsource/ui-components
```

## Building

Building the distribution files:

```sh
    yarn install
    yarn build
```

Note: In some versions of Node < 16, there can be problems importing JSON files. In this case, the above command may not work and you should run the following:
`node --experimental-json-modules rollup --config rollup.config.mjs`

## Storybook

For examples of how to use components, you can run storybook with yarn storybook. That will open a catalogue of all available components and how to use them. For examples on Chakra (on which this library is based on, and provides plenty of components), visit the project's docs.

## Usage

1. Wrap your application with a Chakra Provider and apply the theme (this is application/framework specific, methods may vary):

```js
    import { theme } from "@diamondlightsource/ui-components";

    <ChakraProvider theme={theme}>
    </ChakraProvider>
```

2. Use components

```js
    import { theme } from "@diamondlightsource/ui-components";

    <Pagination
        limit={5}
        onPageChange={setPage}
        onItemCountChange={setItemsPerPage}
        total={900}
    />
```

## Testing

- Run :code:`yarn test`