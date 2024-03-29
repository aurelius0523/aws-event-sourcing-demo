import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { createEventTable } from './dynamo/eventTable';
import * as opensearch from 'aws-cdk-lib/aws-opensearchservice';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { createLambda } from './lambda/eventWriterLambda';
import { aws_osis as osis } from 'aws-cdk-lib';

export class AwsEventSourcingDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const eventTable = createEventTable(this);
    const eventWriterLambda = createLambda(this);

    eventTable.grantReadWriteData(eventWriterLambda);

    const domain = new opensearch.Domain(this, 'MyOpenSearchDomain', {
      version: opensearch.EngineVersion.ELASTICSEARCH_7_9,
      capacity: {
        masterNodes: 1,
        dataNodes: 1,
      },
      ebs: {
        volumeSize: 10,
      },
      nodeToNodeEncryption: true,
      enforceHttps: true,
    });
    
    const cfnPipeline = new osis.CfnPipeline(this, 'MyCfnPipeline', {
      maxUnits: 123,
      minUnits: 123,
      pipelineConfigurationBody: 'pipelineConfigurationBody',
      pipelineName: 'pipelineName',

      // the properties below are optional
      bufferOptions: {
        persistentBufferEnabled: false,
      },
      encryptionAtRestOptions: {
        kmsKeyArn: 'kmsKeyArn',
      },
      logPublishingOptions: {
        cloudWatchLogDestination: {
          logGroup: 'logGroup',
        },
        isLoggingEnabled: false,
      },
      tags: [
        {
          key: 'key',
          value: 'value',
        },
      ],
      vpcOptions: {
        subnetIds: ['subnetIds'],

        // the properties below are optional
        securityGroupIds: ['securityGroupIds'],
      },
    });
  }
}
