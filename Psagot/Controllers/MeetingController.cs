using BL;
using Entities.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Threading.Tasks;
using System.IO;
using OfficeOpenXml;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingController : ControllerBase
    {
        private readonly IMeetingBL _meetingBL;

        public MeetingController(IMeetingBL meetingBL)
        {
            _meetingBL = meetingBL;
        }


        [HttpPut("UpdateMeeting")]
        public async Task<IActionResult> UpdateMeeting([FromBody] MeetingDTO meetingDTO)
        {
            var (updatedMeeting, errorMessage) = await _meetingBL.UpdateMeeting(meetingDTO);

            if (updatedMeeting == null) return BadRequest(errorMessage);

            return Ok(updatedMeeting);
        }


        [HttpGet("GetMeetingById/{id}")]
        public async Task<IActionResult> GetMeetingById([FromRoute] int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid meeting ID.");
            }

            var (meeting, errorMessage) = await _meetingBL.GetMeetingById(id);
            if (meeting == null)
            {
                return NotFound(errorMessage ?? "Meeting not found.");
            }

            return Ok(meeting);
        }


        [HttpGet("GetAllMeetings")]
        public async Task<IActionResult> GetAllMeetings()
        {
            var (meetings, errorMessage) = await _meetingBL.GetAllMeetings();
            if (meetings == null) return BadRequest(errorMessage);

            return Ok(meetings);
        }



        [HttpPost("AddMeeting")]
        public async Task<IActionResult> AddMeeting([FromBody] MeetingDTO meetingDTO)
        {
            var (addedMeeting, errorMessage) = await _meetingBL.AddMeeting(meetingDTO);
            if (addedMeeting == null) return BadRequest(errorMessage);

            return Ok(addedMeeting);
        }



        //  ייצוא לאקסל
        [HttpGet("export-excel")]
        public async Task<IActionResult> ExportMeetingsToExcel()
        {
            var (meetings, errorMessage) = await _meetingBL.GetAllMeetings();
            if (errorMessage != null)
            {
                return BadRequest(errorMessage);  // במקרה של שגיאה, מחזירים תגובה עם השגיאה
            }
            OfficeOpenXml.ExcelPackage.LicenseContext = OfficeOpenXml.LicenseContext.NonCommercial;

            // יצירת קובץ אקסל
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Meetings");

                // כותרות עמודות
                worksheet.Cells[1, 1].Value = "Meeting ID";
                worksheet.Cells[1, 2].Value = "Schedule for Topic ID";
                worksheet.Cells[1, 3].Value = "Meeting Number for Topic";
                worksheet.Cells[1, 4].Value = "Room ID";
                worksheet.Cells[1, 5].Value = "Is Valid";
                worksheet.Cells[1, 6].Value = "Day ID";
                worksheet.Cells[1, 7].Value = "Start Time";
                worksheet.Cells[1, 8].Value = "End Time";
                worksheet.Cells[1, 9].Value = "Is Part of Schedule";

                // עיצוב כותרות
                using (var range = worksheet.Cells[1, 1, 1, 9])
                {
                    range.Style.Font.Bold = true;
                    range.Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    range.AutoFitColumns();
                }
                // כתיבה של הנתונים לטבלה
                int row = 2;
                foreach (var meeting in meetings)
                {
                    worksheet.Cells[row, 1].Value = meeting.MeetingId.ToString();  // כאן אין צורך ב-?
                    worksheet.Cells[row, 2].Value = meeting.ScheduleForTopicId.HasValue ? meeting.ScheduleForTopicId.ToString() : "N/A";
                    worksheet.Cells[row, 3].Value = meeting.MeetingNumberForTopic.ToString();  // גם כאן אין צורך ב-?
                    worksheet.Cells[row, 4].Value = meeting.RoomId == 0 ? "N/A" : meeting.RoomId.ToString();
                    worksheet.Cells[row, 5].Value = meeting.IsValid ? "Yes" : "No";
                    worksheet.Cells[row, 6].Value = meeting.DayId.HasValue ? meeting.DayId.ToString() : "N/A";
                    worksheet.Cells[row, 7].Value = meeting.StartTime.HasValue ? meeting.StartTime.Value.ToString("HH:mm") : "N/A";
                    worksheet.Cells[row, 8].Value = meeting.EndTime.HasValue ? meeting.EndTime.Value.ToString("HH:mm") : "N/A";
                    worksheet.Cells[row, 9].Value = meeting.IsPartOfSchedule ? "Yes" : "No";
                    row++;
                }


                // הגדרת סוג קובץ אקסל
                var excelData = package.GetAsByteArray();
                return File(excelData, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Meetings.xlsx");
            }
        }
    }
}
