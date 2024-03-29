import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export const createEventTable = (construct: Construct) => {
  return new dynamodb.TableV2(construct, 'EventTable', {
    partitionKey: { name: 'userId', type: dynamodb.AttributeType.STRING },
    sortKey: { name: 'timestamp', type: dynamodb.AttributeType.STRING },
    removalPolicy: cdk.RemovalPolicy.DESTROY,
    billing: dynamodb.Billing.onDemand(),
    deletionProtection: false,
    pointInTimeRecovery: true,
    tableName: 'event',
    dynamoStream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
  });
};
