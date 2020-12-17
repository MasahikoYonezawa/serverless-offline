export default class OfflineEndpoint {
  constructor() {
    return {
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
        NOTFOUND: {
          404: {
            statusCode: '404',
          },
          responseModels: {
            'application/json;charset=UTF-8': 'Empty',
          },
          responseParameters: {},
          responseTemplates: {
            'application/json;charset=UTF-8': '',
          },
          statusCode: 404,
        },
        INVALID: {
          500: {
            statusCode: '500',
          },
          responseModels: {
            'application/json;charset=UTF-8': 'Empty',
          },
          responseParameters: {},
          responseTemplates: {
            'application/json;charset=UTF-8': '',
          },
          statusCode: 500,
        },
        BADREQUEST: {
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
          statusCode: 400,
        },
        REDIRECT: {
          302: {
            statusCode: '302',
          },
          responseModels: {
            'application/json;charset=UTF-8': 'Empty',
          },
          responseParameters: {},
          responseTemplates: {
            'application/json;charset=UTF-8': '',
          },
          statusCode: 302,
        },
      },
      type: 'AWS',
    }
  }
}
