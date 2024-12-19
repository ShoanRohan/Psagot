using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public interface ITopicBL
    {
        Task<(IEnumerable<TopicDTO> Topics, string ErrorMessage)> GetAllTopics();
    }
}
