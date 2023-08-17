using Microsoft.OData.Edm;
using DTO.Results;
using Microsoft.AspNetCore.OData;
using Microsoft.OData.ModelBuilder;

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
