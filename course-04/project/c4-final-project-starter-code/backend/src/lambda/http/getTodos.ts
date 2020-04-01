import 'source-map-support/register';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { getTodos } from '../businessLogic/todos';

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createLogger } from '../../utils/logger';

const logger = createLogger('getTodos');

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing getTodos request for event: ', event);
  const allTodos = await getTodos(event);

  return {
    statusCode: 200,
    body: JSON.stringify({
      items: allTodos
    })
  }
})

handler.use(cors({
  credentials: true
}));