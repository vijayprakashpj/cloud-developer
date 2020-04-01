import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { createTodo } from '../businessLogic/todos';

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodoRequest: CreateTodoRequest = JSON.parse(event.body)

  const newTodo = await createTodo(newTodoRequest, event);

  return {
    statusCode: 201,
    body: JSON.stringify({
      item: newTodo
    })
  }
})

handler.use(cors({
  credentials: true
}));