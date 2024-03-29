import { createEventTableAdapter } from './dynamo/eventTable';

export const infra = {
  eventTable: createEventTableAdapter(),
};
