import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { deleteTodo } from '../businessLogic/todos';
import { createLogger } from '../../utils/logger';
import { inspect } from 'util';

const logger = createLogger('deleteTodo');

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing deleteTodo request for ${inspect(event, {depth: null})}`);

  const todoId = event.pathParameters.todoId;
  try {
    await deleteTodo(todoId, event);

    return {
      statusCode: 200,
      body: ''
    };
  }
  catch (ex) {
    logger.error(`Unable to delete ${todoId}. Error: ${ex.toString()}`);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Unable to delete the todo item'
      })
    }
  }
})

handler.use(cors({
  credentials: true
}));