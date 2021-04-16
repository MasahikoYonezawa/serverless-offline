export default class OfflineEndpoint {
  constructor(statusCodes = null) {
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

    if (statusCodes === null) {
      return offlineEndPoint
    }

    Object.keys(statusCodes).forEach((key) => {
      const statusCode = statusCodes[key];
      const responseParameters = {};
      if ("headers" in statusCode){
        Object.keys(statusCode["headers"]).forEach((headerKey) => {
            responseParameters["method.response.header."+headerKey] = statusCode["headers"][headerKey];
        });
      }
      offlineEndPoint.responses[key] = {
        responseModels: {
          'application/json;charset=UTF-8': 'Empty',
        },
        responseParameters: responseParameters,
        responseTemplates: {
          'application/json;charset=UTF-8': '',
        },
        statusCode: key,
      }
      offlineEndPoint.responses[key][key] = {
        statusCode: key,
      }
    })
    return offlineEndPoint
  }
}
