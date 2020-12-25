export default class OfflineEndpoint {
  constructor(statusCodes) {
    const offlineEndPoint = {
      apiKeyRequired: false,
      authorizationType: 'none',
      authorizerFunction: false,
      path: '',
      requestParameters: {},
      requestTemplates: {
        'application/json': '',
      },
      responses: {
        default: {
          400: {
            statusCode: '400',
          },
          responseModels: {
            'application/json;charset=UTF-8': 'Empty',
          },
          responseParameters: {},
          responseTemplates: {
            'application/json;charset=UTF-8': '',
          },
          statusCode: 200,
        },
      },
      type: 'AWS',
    }
    Object.keys(statusCodes).forEach((key) => {
      offlineEndPoint.responses[key] = {
        responseModels: {
          'application/json;charset=UTF-8': 'Empty',
        },
        responseParameters: {},
        responseTemplates: {
          'application/json;charset=UTF-8': '',
        },
        statusCode: key,
      }
      offlineEndPoint.responses[key][key] = {
        statusCode: key,
      }
    })
    console.log('offlineEndPoint')
    console.dir(offlineEndPoint, { depth: null })
    return offlineEndPoint
  }
}
