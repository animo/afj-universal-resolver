export * from "./UniversalDidResovler";

import { Agent, DidsModule } from "@aries-framework/core";
import { UniversalDidResolver } from "./UniversalDidResovler";
import { agentDependencies } from "@aries-framework/node";
import { ariesAskar } from "@hyperledger/aries-askar-nodejs";
import { AskarModule } from "@aries-framework/askar";

void (async () => {
  console.log("creating uni resolver");
  const devUniResolverUrl = "https://dev.uniresolver.io";

  const uni = await UniversalDidResolver.initializeWithDynamicMethods(
    agentDependencies,
    devUniResolverUrl
  );

  console.log("creating agent");
  const agent = new Agent({
    config: {
      label: "my-agent",
      walletConfig: { id: "some-id", key: "some-key" },
    },
    modules: {
      askar: new AskarModule({ ariesAskar }),
      dids: new DidsModule({ resolvers: [uni] }),
    },
    dependencies: agentDependencies,
  });

  console.log("initializing agent");
  await agent.initialize();

  console.log("fetching did doc");
  const { didDocument } = await agent.dids.resolve(
    "did:key:z4MXj1wBzi9jUstyPMS4jQqB6KdJaiatPkAtVtGc6bQEQEEsKTic4G7Rou3iBf9vPmT5dbkm9qsZsuVNjq8HCuW1w24nhBFGkRE4cd2Uf2tfrB3N7h4mnyPp1BF3ZttHTYv3DLUPi1zMdkULiow3M1GfXkoC6DoxDUm1jmN6GBj22SjVsr6dxezRVQc7aj9TxE7JLbMH1wh5X3kA58H3DFW8rnYMakFGbca5CB2Jf6CnGQZmL7o5uJAdTwXfy2iiiyPxXEGerMhHwhjTA1mKYobyk2CpeEcmvynADfNZ5MBvcCS7m3XkFCMNUYBS9NQ3fze6vMSUPsNa6GVYmKx2x6JrdEjCk3qRMMmyjnjCMfR4pXbRMZa3i"
  );

  console.log("printing did doc");
  console.log(didDocument);
})();
