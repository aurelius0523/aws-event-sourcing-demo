import { Runtime } from 'aws-cdk-lib/aws-lambda';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export const createLambda = (construct: Construct) => {
  return new lambda.NodejsFunction(construct, 'EventWriterLambda', {
    runtime: Runtime.NODEJS_20_X,
    entry: 'src/handlers/eventWriter.ts',
    handler: 'handler',
    bundling: {
      minify: true,
      sourceMap: true,
    },
  });
};
