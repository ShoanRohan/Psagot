using BL;
using Microsoft.AspNetCore.Mvc;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly NovuService _novuService;

        public NotificationController(NovuService novuService)
        {
            _novuService = novuService;
        }

        [HttpPost("send-email")]
        public async Task<IActionResult> SendEmail()
        {
            try
            {
                var payload = new Dictionary<string, object>
                {
                    { "name", "John Doe" },
                    { "orderId", "12345" },
                    { "message", "Your order is ready for pickup!" }
                };

                await _novuService.SendEmailAsync(
                    subscriberId: "user123", // מזהה המנוי, למשל כתובת דוא"ל או ID ייחודי
                    workflowId: "order-confirmation-email", // מזהה זרימת העבודה שהגדרת ב-Novu
                    payload: payload
                );

                return Ok(new { message = "Email triggered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error triggering email", error = ex.Message });
            }
        }
    }
}