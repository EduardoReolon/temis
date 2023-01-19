import { HttpContextContract } from "../contracts/requestsContracts";
import Route from "../kernel/routehandler";

Route.group([
  Route.post('update/:id', 'AuthController.update'),
  Route.group([
    Route.get('me/', 'AuthController.me'),
  ]),
])
  .prefix('/api/v1/auth/')
  .middleware(['Auth']);

Route.get('*', async ({params, response}: HttpContextContract) => {response.status(201).send(params)})

export default Route.solveRoutes();
