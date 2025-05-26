using DL;
using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public interface IStatusCourseBL
    {
        Task<(IEnumerable<StatusCourseDTO> Statuses, string ErrorMessage)> GetAllStatuses();
    }

}
