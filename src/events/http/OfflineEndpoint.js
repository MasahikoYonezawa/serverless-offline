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
        404: {
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
        500: {
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
        400: {
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
        302: {
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
        202: {
          202: {
            statusCode: '202',
          },
          responseModels: {
            'application/json;charset=UTF-8': 'Empty',
          },
          responseParameters: {},
          responseTemplates: {
            'application/json;charset=UTF-8': '',
          },
          statusCode: 202,
        },
      },
      type: 'AWS',
    }
  }
}
