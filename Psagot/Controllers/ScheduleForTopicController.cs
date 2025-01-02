﻿using BL;
using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Psagot.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleForTopicController : ControllerBase
    {

        private readonly IScheduleForTopicBL _scheduleForTopicBL;

       
        public ScheduleForTopicController(IScheduleForTopicBL scheduleForTopicBL)
        {
            _scheduleForTopicBL = scheduleForTopicBL;
        }
        [HttpGet("GetScheduleForTopicByTopicId/{topicId}")]
        public async Task<IActionResult> GetScheduleForTopicByTopicId([FromRoute] int topicId)
        {
            var (schedules, errorMessage) = await _scheduleForTopicBL.GetScheduleForTopicByTopicId(topicId);
            if (schedules == null || !schedules.Any())
                return BadRequest(errorMessage);
            return Ok(schedules);
        }
        [HttpPut("UpdateScheduleForTopic")]
        public async Task<IActionResult> UpdateScheduleForTopic([FromBody] ScheduleForTopicDTO scheduleForTopicDTO)
        {
            var (updatedScheduleForTopic, errorMessage) = await _scheduleForTopicBL.UpdateScheduleForTopic(scheduleForTopicDTO);
            if (updatedScheduleForTopic == null) return BadRequest(errorMessage);

            return Ok(updatedScheduleForTopic);
        }


        [HttpGet("GetAllScheduleForTopics")]
        public async Task<IActionResult> GetAllScheduleForTopics()
        {
            var (scheduleForTopics, errorMessage) = await _scheduleForTopicBL.GetAllScheduleForTopics();
            if (scheduleForTopics == null) return BadRequest(errorMessage);
            return Ok(scheduleForTopics);

            
        }


        [HttpGet("GetAllScheduleForTopicByTopicId/{topicId}")]
        public async Task<IActionResult> GetAllScheduleForTopicByTopicId([FromRoute] int topicId)
        {
            var (scheduleForTopic, errorMessage) = await _scheduleForTopicBL.GetAllScheduleForTopicByTopicId(topicId);
            if (scheduleForTopic == null) return NotFound(errorMessage);

            return Ok(scheduleForTopic);
        }

    }
}
