import type {
  AgentContext,
  AgentDependencies,
  DidResolutionResult,
  DidResolver
} from "@aries-framework/core"

export type UniversalDidResolverOptions = {
  fetchIdentifiersUrl: string
  supportedMethods: Array<string>
}

export class UniversalDidResolver implements DidResolver {
  public supportedMethods: Array<string>
  private url: string

  public constructor({
    supportedMethods,
    fetchIdentifiersUrl
  }: UniversalDidResolverOptions) {
    this.supportedMethods = supportedMethods

    this.url = fetchIdentifiersUrl
  }

  public static async initializeWithDynamicMethods(
    agentDependencies: AgentDependencies,
    retrieveMethodsUrl: string,
    fetchIdentifiersUrl: string
  ) {
    const supportedMethods = await (
      await agentDependencies.fetch(retrieveMethodsUrl)
    ).json()

    return new UniversalDidResolver({
      fetchIdentifiersUrl: fetchIdentifiersUrl,
      supportedMethods: supportedMethods
    })
  }

  public async resolve(
    agentContext: AgentContext,
    did: string
  ): Promise<DidResolutionResult> {
    const requestUrl = this.url.endsWith("/")
      ? `${this.url}${did}`
      : `${this.url}/${did}`

    const result = await agentContext.config.agentDependencies.fetch(requestUrl)

    return (await result.json()) as DidResolutionResult
  }
}
