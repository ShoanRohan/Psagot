using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities.DTO;
using Entities.Models;

namespace BL
{
    public interface ITopicBL
    {
        Task<(IEnumerable<TopicDTO> Topics, string ErrorMessage)> GetAllTopicsByCourseId(int courseId);
    }

}
