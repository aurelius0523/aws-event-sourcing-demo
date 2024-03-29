import { Handler } from 'aws-cdk-lib/aws-lambda';
import { EventBridgePutEvents } from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { EventBridgeHandler } from 'aws-lambda';
import { infra } from '../infra/infra';

export const handler: EventBridgeHandler<
  'hello-detail-type',
  { userId: string },
  void
> = async (event, ctx, cb) => {
  await infra.eventTable.put({
    userId: event.detail.userId,
    timestamp: new Date().toISOString(),
    data: {
      name: `kim + ${Math.random() * 10000}`,
    },
  });
};
