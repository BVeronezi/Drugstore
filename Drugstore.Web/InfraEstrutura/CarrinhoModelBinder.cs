using Drugstore.Dominio.Entidades;
using System.Web.Mvc;

namespace Drugstore.Web.InfraEstrutura
{
    public class CarrinhoModelBinder : IModelBinder
    {
        private const string SessionKey = "Carrinho";

        //IModelBinder interface define o método BindModel
        public object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext)
        {
            //Obtenho o carrinho da sessão
            Carrinho carrinho = null;
            if (controllerContext.HttpContext.Session != null)
            {
                carrinho = (Carrinho)controllerContext.HttpContext.Session[SessionKey];
            }
            // Criar o carrinho se não tenho a sessao
            if (carrinho == null)
            {
                carrinho = new Carrinho();
                if (controllerContext.HttpContext.Session != null)
                {
                    controllerContext.HttpContext.Session[SessionKey] = carrinho;
                }
            }
            // Return carrinho
            return carrinho;
        }
    }
}