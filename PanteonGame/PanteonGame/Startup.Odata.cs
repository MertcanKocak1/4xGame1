using Microsoft.OData.Edm;
using DTO.Results;
using Microsoft.AspNet.OData.Builder;

namespace PanteonGame
{
    public partial class Startup
    {
        private static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();

            builder.EntitySet<RsBuilding>("Building");
            builder.EnableLowerCamelCase();
            return builder.GetEdmModel();
        }
    }
}
