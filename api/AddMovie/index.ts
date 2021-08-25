import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos"


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  try {
  let userDetails = null;
  const header = req.headers['x-ms-client-principal'];
  if (header) {
    const encoded = Buffer.from(header, 'base64');
    const decoded = encoded.toString('ascii');
    userDetails = JSON.parse(decoded)
  }

  if (!userDetails || !req.body || !req.body.title) {
    context.res = {
      body: {
        message: "please log in or provide a title"
      }
    };

    context.done();
    return;
  }

  const endpoint = process.env.DB_ENDPOINT;
  const key = process.env.DB_KEY;
  const databaseName = 'uae-bootcamp';
  const containerName = 'users';

  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseName);
  const container = database.container(containerName);

  const item = {
    groupId: '55555',
    user: userDetails,
    movie: req.body.title
  }
  const itemsRes = await container.items.create(item);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
          message: 'success'
        }
    };

  } catch (error) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: {
        message: error
      }
  };
  }

};

export default httpTrigger;
