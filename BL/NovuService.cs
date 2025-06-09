using Novu;
using Novu.Models.Components;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BL
{
    public class NovuService
    {
        private readonly NovuSDK _novuSdk;

        public NovuService(string apiKey)
        {
            _novuSdk = new NovuSDK(secretKey: apiKey);
        }

        public async Task SendEmailAsync(string subscriberId, string workflowId, Dictionary<string, object> payload)
        {
            var trigger = new TriggerEventRequestDto
            {
                WorkflowId = workflowId,
                To = To.CreateStr(subscriberId),
                Payload = payload
            };

            await _novuSdk.TriggerAsync(trigger, idempotencyKey: subscriberId);
        }
    }
}



