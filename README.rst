Web UI Components Library
===========================

|code_ci| |code_cov|

============== ==============================================================
Source code    https://github.com/DiamondLightSource/web-ui-components
============== ==============================================================

Generic components for React based Diamond web apps

==========
Installing
==========

.. code-block:: bash
    yarn add @diamondlightsource/ui-components

==========
Building
==========

Building the distribution files:

.. code-block:: bash

    yarn install

    yarn build

Note: In some versions of Node < 16, there can be problems importing JSON files. In this case, the above command may not work and you should run the following:
:code:`node --experimental-json-modules rollup --config rollup.config.mjs`

============
Storybook
============

For examples of how to use components, you can run storybook with yarn storybook. That will open a catalogue of all available components and how to use them. For examples on Chakra (on which this library is based on, and provides plenty of components), visit the project's docs.

============
Usage
============

1. Wrap your application with a Chakra Provider and apply the theme (this is application/framework specific, methods may vary):

.. code-block:: javascript

    import { theme } from "@diamondlightsource/ui-components";

    <ChakraProvider theme={theme}>
    </ChakraProvider>

2. Use components

.. code-block:: javascript
    
    import { theme } from "@diamondlightsource/ui-components";

    <Pagination
        limit={5}
        onPageChange={setPage}
        onItemCountChange={setItemsPerPage}
        total={900}
    />

============
Testing
============

- Run :code:`yarn test`

.. |code_ci| image:: https://github.com/DiamondLightSource/pato-frontend/actions/workflows/node.js.yml/badge.svg
    :target: https://github.com/DiamondLightSource/pato-frontend/actions/workflows/node.js.yml
    :alt: Code CI

.. |license| image:: https://img.shields.io/badge/License-Apache%202.0-blue.svg
    :target: https://opensource.org/licenses/Apache-2.0
    :alt: Apache License
..
    Anything below this line is used when viewing README.rst and will be replaced
    when included in index.rst
