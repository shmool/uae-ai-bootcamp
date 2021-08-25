import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos"


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {


  const endpoint = process.env.DB_ENDPOINT;
  const key = process.env.DB_KEY;
  const databaseName = 'uae-bootcamp';
  const containerName = 'users';

  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseName);
  const container = database.container(containerName);

  const itemRes = await container.item('6a5e4c28-7b5f-47d3-b1e4-7fee04bd36d6', '55555').read();
  const item = {...itemRes.resource, rating: 5};
  const updateRes = await container.
    item('6a5e4c28-7b5f-47d3-b1e4-7fee04bd36d6', '55555').
    replace(item);



    context.res = {
        // status: 200, /* Defaults to 200 */
        body: updateRes.resource
    };

};

export default httpTrigger;
