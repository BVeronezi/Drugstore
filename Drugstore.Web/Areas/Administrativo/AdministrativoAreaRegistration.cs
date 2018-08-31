using System.Web.Mvc;

namespace Drugstore.Web.Areas.Administrativo
{
    public class AdministrativoAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Administrativo";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "Administrativo_default",
                "Administrativo/{controller}/{action}/{id}",
                new { controller="Produto", action = "Admin", id = UrlParameter.Optional },
                namespaces: new [] { "Drugstore.Web.Areas.Administrativo.Controllers" }
            );
        }
    }
}