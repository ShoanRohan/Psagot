using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public partial class ListOfMeetingsForTopic
    {
        public int TopicId { get; set; }

        public string Name { get; set; } = null!;
    }
}
