import {
  Agent,
  AgentContext,
  AgentDependencies,
  DidResolutionResult,
  DidResolver,
} from "@aries-framework/core";

export type UniversalDidResolverOptions = {
  baseUrl: string;
  supportedMethods: Array<string>;
};

export class UniversalDidResolver implements DidResolver {
  public supportedMethods: Array<string>;
  private url: string;

  public constructor({
    supportedMethods,
    baseUrl,
  }: UniversalDidResolverOptions) {
    this.supportedMethods = supportedMethods;
    this.url = `${baseUrl}/1.0/identifiers`;
  }

  public static async initializeWithDynamicMethods(
    agentDependencies: AgentDependencies,
    baseUrl: string
  ) {
    const methodsUrl = `${baseUrl}/1.0/methods`;

    const supportedMethods = await (
      await agentDependencies.fetch(methodsUrl)
    ).json();

    return new UniversalDidResolver({
      baseUrl,
      supportedMethods: supportedMethods,
    });
  }

  public async resolve(
    agentContext: AgentContext,
    did: string
  ): Promise<DidResolutionResult> {
    const requestUrl = `${this.url}/${did}`;

    const result =
      await agentContext.config.agentDependencies.fetch(requestUrl);

    return (await result.json()) as DidResolutionResult;
  }
}
