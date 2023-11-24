import type {
  AgentContext,
  AgentDependencies,
  DidResolutionResult,
  DidResolver
} from "@aries-framework/core"
export type UniversalDidResolverOptions = {
  baseUrl: string
  supportedMethods: Array<string>
}
export declare class UniversalDidResolver implements DidResolver {
  supportedMethods: Array<string>
  private url
  constructor({ supportedMethods, baseUrl }: UniversalDidResolverOptions)
  static initializeWithDynamicMethods(
    agentDependencies: AgentDependencies,
    baseUrl: string
  ): Promise<UniversalDidResolver>
  resolve(agentContext: AgentContext, did: string): Promise<DidResolutionResult>
}
