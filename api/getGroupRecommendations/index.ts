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

  const groupId = req.query.groupId;
  if (!groupId) {
    context.res = {
      body: {
        message: "please provide a groupId"
      }
    }

    context.done();
    return;
  }

  context.log('GROUP ID:', groupId + '')
  const query = `SELECT * FROM c WHERE c.groupId = "${groupId}"`;

  const groupData = await container.items.query(query).fetchAll();


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
          data: groupData
        }
    };

};

export default httpTrigger;
