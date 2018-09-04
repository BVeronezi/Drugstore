using Drugstore.Dominio.Repositorio;
using Drugstore.Web.Models;
using Drugstore.Web.Utils;
using Drugstore.Web.ViewModels;
using System.Linq;
using System.Security.Claims;
using System.Web.Mvc;

namespace Drugstore.Web.Controllers
{
    public class PerfilController : Controller
    {


        [Authorize]
        public ActionResult AlterarSenha()
        {
            return View();
        }
        //    [HttpPost]
        //    public ActionResult AlterarSenha(AlterarSenhaViewModel viewmodel)
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            return View();
        //        }

        //        var identity = User.Identity as ClaimsIdentity;
        //        var login = identity.Claims.FirstOrDefault(c => c.Type == "Login").Value;

        //        var usuario = _repositorio.FirstOrDefault(u => u.Login == login);

        //        if (Hash.GerarHash(viewmodel.SenhaAtual) != usuario.Senha)
        //        {
        //            ModelState.AddModelError("SenhaAtual", "Senha incorreta");
        //            return View();
        //        }

        //        usuario.Senha = Hash.GerarHash(viewmodel.NovaSenha);
        //        _repositorio.Entry(usuario).State = System.Data.Entity.EntityState.Modified;
        //        _repositorio.SaveChanges();

        //        TempData["Mensagem"] = "Senha Alterada com sucesso";

        //        return RedirectToAction("Index", "Painel");
        //    }
        //}

    }
}

