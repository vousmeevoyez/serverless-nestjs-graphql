# Serverless, AWS, NestJS, GraphQL and DynamoDB starter

<p>
<a href="https://github.com/hardyscc/aws-nestjs-starter/actions"><img src="https://github.com/hardyscc/aws-nestjs-starter/workflows/Node.js%20CI/badge.svg" alt="CI"></a>
<a href="https://sonarcloud.io/dashboard?id=hardyscc_aws-nestjs-starter"><img src="https://sonarcloud.io/api/project_badges/measure?project=hardyscc_aws-nestjs-starter&metric=alert_status" alt="Alert Status"></a>
<a href="https://sonarcloud.io/component_measures?id=hardyscc_aws-nestjs-starter&metric=coverage&view=list"><img src="https://sonarcloud.io/api/project_badges/measure?project=hardyscc_aws-nestjs-starter&metric=coverage" alt="Coverage"></a>
<a href="https://sonarcloud.io/project/issues?id=hardyscc_aws-nestjs-starter&resolved=false"><img src="https://sonarcloud.io/api/project_badges/measure?project=hardyscc_aws-nestjs-starter&metric=bugs" alt="Bugs"></a>
<a href="https://sonarcloud.io/project/issues?id=hardyscc_aws-nestjs-starter&resolved=false"><img src="https://sonarcloud.io/api/project_badges/measure?project=hardyscc_aws-nestjs-starter&metric=code_smells" alt="Code Smells"></a>
<a href="https://github.com/hardyscc/aws-nestjs-starter/blob/master/LICENSE"><img src="https://img.shields.io/github/license/hardyscc/aws-nestjs-starter" alt="License"></a>
<a href="https://twitter.com/hardyscchk"><img src="https://img.shields.io/twitter/follow/hardyscchk.svg?style=social&label=Follow"></a>
</p>

## Description

A starter project that makes creating a deployable AWS Serverless project extremely easy.

## Technologies

- [AWS Lambda](https://aws.amazon.com/lambda)
- [Serverless](https://serverless.com/framework/docs/providers/aws/)
- [NestJS](https://docs.nestjs.com/)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)

## Usage

```bash
git clone https://github.com/vousmeevoyez/serverless-nestjs-graphql <Your_Project_Name>
cd <Your_Project_Name>

npm install
```

After that find and replace `aws-nestjs-starter` to your project name on the following files:

- package.json
- serverless.yml
- .env

## Setup AWS Credentials

1. [Sign up for an AWS account](https://serverless.com/framework/docs/providers/aws/guide/credentials#sign-up-for-an-aws-account)

2. Login to your AWS account and go to the **Identity & Access Management (IAM)** page.

3. Click on **Users** and then **Add user**. Enter a name in the first field to remind you this User is related to the Serverless Framework, like `serverless-admin`. Enable **Programmatic access** by clicking the checkbox. Click **Next** to go through to the Permissions page. Click on **Attach existing policies directly**. Search for and select **AdministratorAccess** then click **Next: Review**. Check to make sure everything looks good and click **Create user**.

4. View and copy the **API Key & Secret** to a temporary place. You'll need it in the next step.

## Setup Workstation

Install AWS CLI

- Windows: `choco install awscli`
- MacOS: `brew install awscli`

Config AWS CLI

```bash
$ aws configure

AWS Access Key ID [****************TKYQ]:
AWS Secret Access Key [****************yNO2]:
Default region name [None]:
Default output format [None]:
```

> Please enter your **AWS Access Key ID** and **AWS Secret Access Key**

## Deployment

```bash
# deploy to AWS
$ npm run deploy
```

## Local Offline Development

```bash
# start serverless-offline server
$ npm run sls:start

# start serverless-offline server and connect to online dynamodb
$ npm run sls:online
```

## Local NestJS Development - (Optional)

```bash
# start local nestjs server
$ npm start

# start local nestjs server in watch mode
$ npm run start:watch
```

## Unit Testing

```bash
# run unit test
$ npm test

# run unit test with coverage
$ npm run test:cov
```

## E2E Testing

```bash
# run unit test with coverage
$ npm run test:e2e
```

## GraphQL Endpoint Test

- offline: http://localhost:3000/dev/graphql
- local: http://localhost:3000/graphql
- AWS: https://<your_aws_deployment_id>.execute-api.<your_aws_region>.amazonaws.com/dev/graphql


## Stay in touch

- Author - [Kelvin](mailto:kelvindsmn@gmail.com)
- Twitter - [@vousmeevoyez](https://twitter.com/vousmeevoyez)
