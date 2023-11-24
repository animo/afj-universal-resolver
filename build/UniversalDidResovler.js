"use strict"
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
Object.defineProperty(exports, "__esModule", { value: true })
exports.UniversalDidResolver = void 0
class UniversalDidResolver {
  constructor({ supportedMethods, baseUrl }) {
    this.supportedMethods = supportedMethods
    this.url = `${baseUrl}/1.0/identifiers`
  }
  static initializeWithDynamicMethods(agentDependencies, baseUrl) {
    return __awaiter(this, void 0, void 0, function* () {
      const methodsUrl = `${baseUrl}/1.0/methods`
      const supportedMethods = yield (yield agentDependencies.fetch(
        methodsUrl
      )).json()
      return new UniversalDidResolver({
        baseUrl,
        supportedMethods: supportedMethods
      })
    })
  }
  resolve(agentContext, did) {
    return __awaiter(this, void 0, void 0, function* () {
      const requestUrl = `${this.url}/${did}`
      const result =
        yield agentContext.config.agentDependencies.fetch(requestUrl)
      return yield result.json()
    })
  }
}
exports.UniversalDidResolver = UniversalDidResolver
//# sourceMappingURL=UniversalDidResovler.js.map
