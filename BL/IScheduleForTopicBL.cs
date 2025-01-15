﻿using Entities.DTO;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IScheduleForTopicBL
    {
        Task<(bool IsDeleted , string ErrorMessage)> DeleteScheduleForTopic(int TopicId);
    }
}