'use strict';

const _ = require('lodash');

class ErrorHandling {
  constructor(serverless) {
    this.serverless = serverless;
    this.service = serverless.service;

    this.provider = this.serverless.getProvider('aws');

    this.hooks = {
      'before:package:compileEvents': this.beforePackageCompileEvents.bind(this),
    };
  }

  beforePackageCompileEvents() {
    this.serverless.cli.log('Adding gateway reponses for errors...');

    _.merge(
      this.service.provider.compiledCloudFormationTemplate.Resources,
      {
        GatewayResponse4xx: {
          Type: 'AWS::ApiGateway::GatewayResponse',
          Properties: {
            ResponseParameters: {
              'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
              'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
            },
            ResponseType: 'DEFAULT_4XX',
            ResponseTemplates: {
              'application/json': '{"errorMessage":$context.error.messageString, "errorType": "$context.error.responseType", "apiRequestId": "$context.requestId"}',
            },
            RestApiId: { Ref: this.provider.naming.getRestApiLogicalId() },
          },
        },
        GatewayResponse5xx: {
          Type: 'AWS::ApiGateway::GatewayResponse',
          Properties: {
            ResponseParameters: {
              'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
              'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
            },
            ResponseType: 'DEFAULT_5XX',
            ResponseTemplates: {
              'application/json': '{"errorMessage":"Application Error", "errorType": "ApplicationError", "apiRequestId": "$context.requestId"}',
            },
            RestApiId: { Ref: this.provider.naming.getRestApiLogicalId() },
          },
        },
      }
    );
  }
}

module.exports = ErrorHandling;
