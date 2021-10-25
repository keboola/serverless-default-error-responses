## serverless-default-error-responses

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

Serverless plugin that adds unified API Gateway responses for error states. It adds CORS headers to all 4xx and 5xx API responses and formats output for users like this:
```json
{
  "errorMessage": "Application Error", 
  "errorCode": 500, 
  "apiRequestId": "2e2819fa-c93c-11e7-a46f-91ce8f8df51e"
}
```
It hides real error reason in case of 5xx errors and replaces it for `Application Error`. It also adds API Gateway request id for potential further investigation in CloudWatch logs. 


### Installation

1. Install npm package: `yarn add @keboola/serverless-default-error-responses --dev`
2. Add plugin to your `serverless.yml`:
```yaml
plugins:
- '@keboola/serverless-default-error-responses'
```
