import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import OfflineEndpoint from './OfflineEndpoint.js'
import debugLog from '../../debugLog.js'

const { keys } = Object

function readFile(filePath) {
  return readFileSync(filePath, 'utf8')
}

// velocity template defaults
const defaultRequestTemplate = readFile(
  resolve(__dirname, './templates/offline-default.req.vm'),
)
const defaultResponseTemplate = readFile(
  resolve(__dirname, './templates/offline-default.res.vm'),
)

function getResponseContentType(fep) {
  if (fep.response && fep.response.headers['Content-Type']) {
    return fep.response.headers['Content-Type'].replace(/'/gm, '')
  }

  return 'application/json'
}

export default class Endpoint {
  #handlerPath = null
  #http = null

  constructor(handlerPath, http) {
    this.#handlerPath = handlerPath
    this.#http = http

    return this._generate()
  }

  // determine whether we have function level overrides for velocity templates
  // if not we will use defaults
  _setVmTemplates(fullEndpoint) {
    // determine requestTemplate
    // first check if requestTemplate is set through serverless
    const fep = fullEndpoint

    try {
      // determine request template override
      const reqFilename = `${this.#handlerPath}.req.vm`

      // check if serverless framework populates the object itself
      if (
        typeof this.#http.request === 'object' &&
        typeof this.#http.request.template === 'object'
      ) {
        const templatesConfig = this.#http.request.template

        keys(templatesConfig).forEach((key) => {
          fep.requestTemplates[key] = templatesConfig[key]
        })
      }
      // load request template if exists if not use default from serverless offline
      else if (existsSync(reqFilename)) {
        fep.requestTemplates['application/json'] = readFile(reqFilename)
      } else {
        fep.requestTemplates['application/json'] = defaultRequestTemplate
      }

      // determine response template
      const resFilename = `${this.#handlerPath}.res.vm`

      fep.responseContentType = getResponseContentType(fep)
      debugLog('Response Content-Type ', fep.responseContentType)

      // load response template from http response template, or load file if exists other use default
      const { statusCodes } = fep.response
      Object.keys(statusCodes).forEach((key) => {
        fep.responses[key].responseTemplates[fep.responseContentType] =
          statusCodes[key].template
      })
      if (fep.response && fep.response.template) {
        fep.responses.default.responseTemplates[fep.responseContentType] =
          fep.response.template
      } else if (existsSync(resFilename)) {
        fep.responses.default.responseTemplates[
          fep.responseContentType
        ] = readFile(resFilename)
      } else {
        fep.responses.default.responseTemplates[
          fep.responseContentType
        ] = defaultResponseTemplate
      }
    } catch (err) {
      debugLog(`Error: ${err}`)
    }

    return fep
  }

  // loosely based on:
  // https://github.com/serverless/serverless/blob/v1.59.2/lib/plugins/aws/package/compile/events/apiGateway/lib/validate.js#L380
  _getIntegration(http) {
    const { integration, async: isAsync } = http
    if (integration) {
      const normalizedIntegration = integration.toUpperCase().replace('-', '_')
      if (normalizedIntegration === 'LAMBDA') {
        return 'AWS'
      }
      if (normalizedIntegration === 'LAMBDA_PROXY') {
        return 'AWS_PROXY'
      }
      return normalizedIntegration
    }

    if (isAsync) {
      return 'AWS'
    }

    return 'AWS_PROXY'
  }

  // return fully generated Endpoint
  _generate() {
    let statusCodes = null
    if (
      this.#http &&
      Object.prototype.hasOwnProperty.call(this.#http, 'response')
    ) {
      if (
        this.#http.response &&
        Object.prototype.hasOwnProperty.call(this.#http.response, 'statusCodes')
      ) {
        statusCodes = this.#http.response.statusCodes
      }
    }
    const offlineEndpoint = new OfflineEndpoint(statusCodes)

    const fullEndpoint = {
      ...offlineEndpoint,
      ...this.#http,
    }

    fullEndpoint.integration = this._getIntegration(this.#http)

    if (fullEndpoint.integration === 'AWS') {
      // determine request and response templates or use defaults
      return this._setVmTemplates(fullEndpoint)
    }

    return fullEndpoint
  }
}
