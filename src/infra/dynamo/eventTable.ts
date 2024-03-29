import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

export type EventTableDataModel<T> = {
  userId: string;
  timestamp: string;
  data: T;
};

export const createEventTableAdapter = () => {
  const client = new DynamoDBClient();
  const documentClient = DynamoDBDocumentClient.from(client);

  return {
    put: async <T>(dataModel: EventTableDataModel<T>) => {
      const command = new PutCommand({
        TableName: 'EventTable',
        Item: dataModel,
      });
      return documentClient.send(command);
    },

    get: async (userId: string, timestamp: string) => {
      const command = new GetCommand({
        TableName: 'EventTable',
        Key: { userId, timestamp },
      });
      return documentClient.send(command);
    },
  };
};
