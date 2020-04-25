using System;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace API.Middleware
{
    public class ErrorHandlingMidleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMidleware> _logger;
        public ErrorHandlingMidleware(RequestDelegate next, ILogger<ErrorHandlingMidleware> logger)
        {
           _logger = logger;
            _next = next;

        }

        public async Task Invoke(HttpContext context){

         try
         {
             await _next(context); 
         }
         catch (Exception ex)
         {
             
             await HandleExceptionAsync(context,ex,_logger);
         }   
        }

        private async Task  HandleExceptionAsync(HttpContext context, Exception ex, ILogger<ErrorHandlingMidleware> logger)
        {
            object errors = null;
            switch (ex)
            {
                case RestException re:
                logger.LogError(ex,"rest error");
                errors=re.Errors;
                context.Response.StatusCode=(int)re.Code;
                break;
                case Exception e:
                logger.LogError(e,"server error");
                    errors=string.IsNullOrWhiteSpace(e.Message)?"error":e.Message;
                    context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
                    break;

            }
            context.Response.ContentType="Application/Json";
            if (errors !=null){

                var results=JsonConvert.SerializeObject(new {

                    errors
                });
            await   context.Response.WriteAsync(results);
            }
            
        }
        
    }
}