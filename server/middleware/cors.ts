const allowedOrigins = ['http://localhost:3000', 'http://localhost:8100', 'http://localhost:5173', 'http://localhost:5000', 'http://localhost', 'https://localhost'];

export default defineEventHandler((event) => {
    // if(event.path !== '/api/user/google/login' && event.path !== '/api/user/google/register') return;
    
    // Define allowed origins
   
    // Get the origin of the incoming request
    const requestOrigin = getRequestHeader(event, 'origin') as string;
   
    // Check if the request origin is in the list of allowed origins
    if (allowedOrigins.includes(requestOrigin)) {
       // Set the Access-Control-Allow-Origin header to the request origin
       setResponseHeaders(event, {
         "Access-Control-Allow-Credentials": 'true',
         'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie, Set-Cookie',
         'Access-Control-Allow-Methods': 'GET, POST',
         'Access-Control-Allow-Origin': requestOrigin,
       })
    }
   })