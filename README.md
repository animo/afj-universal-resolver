<p align="center">
  <picture>
   <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656578320/animo-logo-light-no-text_ok9auy.svg">
   <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656578320/animo-logo-dark-no-text_fqqdq9.svg">
   <img alt="Animo Logo" height="250px" />
  </picture>
</p>

<h1 align="center" ><b>Univeral Resolver integration for Aries Framework JavaScript</b></h1>

<h4 align="center">Powered by &nbsp; 
  <picture>
    <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656579715/animo-logo-light-text_cma2yo.svg">
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/animo-solutions/image/upload/v1656579715/animo-logo-dark-text_uccvqa.svg">
    <img alt="Animo Logo" height="12px" />
  </picture>
</h4><br>

<p align="center">
  <a href="https://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg" />
  </a>
  <a href="https://yarnpkg.com">
    <img src="https://img.shields.io/badge/yarn-workspaces-2188b6" />
  </a>
  <a href="https://opensource.org/licenses/Apache-2.0">
    <img src="https://img.shields.io/badge/License-Apache_2.0-yellowgreen.svg" />
  </a>
</p>

<p align="center">
  <a href="#getting-started">Getting started</a> 
  &nbsp;|&nbsp;
  <a href="#usage">Usage</a> 
  &nbsp;|&nbsp;
  <a href="#contributing">Contributing</a> 
  &nbsp;|&nbsp;
  <a href="#license">License</a> 
</p>

---

## Getting Started

<details>
<summary>Yarn</summary>

```console
yarn add @animo-id/afj-universal-resolver
```

</details>

## Usage

> NOTE: it is recommended to use a self-hosted universal resolver and only use
> the development hosted one for development.

```typescript
import { UniversalDidResolver } from "@animo-id/afj-universal-resolver"
import { agentDependencies } from "@aries-framework/node"
import { Agent, DidsModule } from "@aries-framework/core"
import { AskarModule } from "@aries-framework/askar"
import { ariesAskar } from "@hyperledger/aries-askar-nodejs"

const devUniResolverUrl = "https://dev.uniresolver.io"
const didKey =
  "did:key:z4MXj1wBzi9jUstyPMS4jQqB6KdJaiatPkAtVtGc6bQEQEEsKTic4G7Rou3iBf9vPmT5dbkm9qsZsuVNjq8HCuW1w24nhBFGkRE4cd2Uf2tfrB3N7h4mnyPp1BF3ZttHTYv3DLUPi1zMdkULiow3M1GfXkoC6DoxDUm1jmN6GBj22SjVsr6dxezRVQc7aj9TxE7JLbMH1wh5X3kA58H3DFW8rnYMakFGbca5CB2Jf6CnGQZmL7o5uJAdTwXfy2iiiyPxXEGerMhHwhjTA1mKYobyk2CpeEcmvynADfNZ5MBvcCS7m3XkFCMNUYBS9NQ3fze6vMSUPsNa6GVYmKx2x6JrdEjCk3qRMMmyjnjCMfR4pXbRMZa3i"

const uni = await UniversalDidResolver.initializeWithDynamicMethods(
  agentDependencies,
  devUniResolverUrl
)

const agent = new Agent({
  config: {
    label: "my-agent",
    walletConfig: { id: "some-id", key: "some-key" }
  },
  modules: {
    askar: new AskarModule({ ariesAskar }),
    dids: new DidsModule({ resolvers: [uni] })
  },
  dependencies: agentDependencies
})

await agent.initialize()

const { didDocument } = await agent.dids.resolve(didKey)
```

## Contributing

Is there something you'd like to fix or add? Great, we love community
contributions! To get involved, please follow our [contribution
guidelines](./CONTRIBUTING.md).

## License

[Apache 2.0](./LICENSE)
