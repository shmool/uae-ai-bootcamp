import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    const country = req.query.country;
    const city = req.query.city;

    const responseMessage = name
        ? `Hello, ${name}!!! You are located in ${city}, ${country}. This HTTP triggered function executed successfully.`
        : `This HTTP triggered function executed successfully.
        Pass a name, country and city in the query string or in the request
        body for a personalized response. To use Query params, first append '?' to the URL, then
        type key=value, and append them with '&'.
        For example,
        https://your.domain.com/api/GetHelloMessage?name=HackaLearn&country=UAE&city=Al%20Ain`;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;
