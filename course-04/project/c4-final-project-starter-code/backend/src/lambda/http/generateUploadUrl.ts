import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { getAttachmentUploadUrl } from '../businessLogic/todos';
import { createLogger } from '../../utils/logger';
import { inspect } from 'util';

const logger = createLogger('generateUploadUrl');

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info(`Processing generateUploadUrl request for ${inspect(event, {depth: null})}`);
  try {
    const todoId = event.pathParameters.todoId;
    const uploadUrl = await getAttachmentUploadUrl(todoId, event);
    return {
      statusCode: 200,
      body: JSON.stringify({
        'uploadUrl': uploadUrl
      })
    };
  }
  catch(ex) {
    logger.error(`Unable to generate upload url. Error: ${ex.toString()}`);
    return {
      statusCode: 500,
      body: 'Unable to generate upload url'
    }
  }
});

handler.use(cors({
  credentials: true
}))