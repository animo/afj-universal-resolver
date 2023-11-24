import { describe, it } from "node:test"
import assert, { deepStrictEqual } from "node:assert"

import { UniversalDidResolver } from "../src"
import { agentDependencies } from "@aries-framework/node"
import { Agent, DidsModule } from "@aries-framework/core"
import { AskarModule } from "@aries-framework/askar"
import { ariesAskar } from "@hyperledger/aries-askar-nodejs"

describe("Universal Resolver + AFJ", { timeout: 120000 }, async () => {
  // const BASE_URL = "https://dev.uniresolver.io"
  const BASE_URL = "http://localhost:8080"
  const FETCH_IDENTIFIERS_URL = `${BASE_URL}/1.0/identifiers`
  const FETCH_METHODS_URL = `${BASE_URL}/1.0/methods`

  it("should instantiate a universal resolver", async () => {
    const uni = new UniversalDidResolver({
      fetchIdentifiersUrl: FETCH_IDENTIFIERS_URL,
      supportedMethods: ["key"]
    })
    assert(uni instanceof UniversalDidResolver)
  })

  it(
    "should instantiate a universal resolver with dynamic methods",
    { skip: true },
    async () => {
      const uni = await UniversalDidResolver.initializeWithDynamicMethods(
        agentDependencies,
        FETCH_METHODS_URL,
        FETCH_IDENTIFIERS_URL
      )
      assert(uni instanceof UniversalDidResolver)
    }
  )

  it("should use the uniresolver via the agent", async () => {
    const didJwk =
      "did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ"

    const uni = new UniversalDidResolver({
      fetchIdentifiersUrl: FETCH_IDENTIFIERS_URL,
      supportedMethods: ["jwk"]
    })

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

    const { didDocument } = await agent.dids.resolve(didJwk)

    deepStrictEqual(didDocument, {
      "@context": [
        "https://www.w3.org/ns/did/v1",
        {
          "@vocab": "https://www.iana.org/assignments/jose#"
        }
      ],
      id: "did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ",
      verificationMethod: [
        {
          id: "#0",
          type: "JsonWebKey2020",
          controller:
            "did:jwk:eyJraWQiOiJ1cm46aWV0ZjpwYXJhbXM6b2F1dGg6andrLXRodW1icHJpbnQ6c2hhLTI1NjpGZk1iek9qTW1RNGVmVDZrdndUSUpqZWxUcWpsMHhqRUlXUTJxb2JzUk1NIiwia3R5IjoiT0tQIiwiY3J2IjoiRWQyNTUxOSIsImFsZyI6IkVkRFNBIiwieCI6IkFOUmpIX3p4Y0tCeHNqUlBVdHpSYnA3RlNWTEtKWFE5QVBYOU1QMWo3azQifQ",
          publicKeyJwk: {
            kid: "urn:ietf:params:oauth:jwk-thumbprint:sha-256:FfMbzOjMmQ4efT6kvwTIJjelTqjl0xjEIWQ2qobsRMM",
            kty: "OKP",
            crv: "Ed25519",
            alg: "EdDSA",
            x: "ANRjH_zxcKBxsjRPUtzRbp7FSVLKJXQ9APX9MP1j7k4"
          }
        }
      ],
      authentication: ["#0"],
      assertionMethod: ["#0"],
      capabilityInvocation: ["#0"],
      capabilityDelegation: ["#0"]
    })
  })

  it("should use the uniresolver via the agent", { skip: true }, async () => {
    const didJwk = "did:jwk:foo"

    const uni = new UniversalDidResolver({
      fetchIdentifiersUrl: FETCH_IDENTIFIERS_URL,
      supportedMethods: ["jwk"]
    })

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

    const { didDocumentMetadata } = await agent.dids.resolve(didJwk)

    deepStrictEqual(didDocumentMetadata, {
      error: "methodNotSupported",
      errorMessage: "Method not supported: key",
      contentType: "application/did+ld+json"
    })
  })
})
