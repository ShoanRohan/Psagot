﻿using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DL
{
    public interface ITopicDL
    {
        Task<(IEnumerable<Topic> Topics, string ErrorMessage)> GetAllTopics();
    }
}
