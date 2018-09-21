using Drugstore.Dominio.Repositorio;
using Drugstore.Web.Models;
using Drugstore.Web.Utils;
using Drugstore.Web.ViewModels;
using System.Linq;
using System.Security.Claims;
using System.Web.Mvc;

namespace Drugstore.Web.Controllers
{
    [Authorize]
    public class PerfilController : Controller
    {
        private UsuariosContext db = new UsuariosContext();

        public ActionResult AlterarSenha()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AlterarSenha(AlterarSenhaViewModel viewmodel)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            var identity = User.Identity as ClaimsIdentity;
            var login = identity.Claims.FirstOrDefault(c => c.Type == "Login").Value;

            var usuario = db.Usuarios.FirstOrDefault(u => u.Login == login);

            if (Hash.GerarHash(viewmodel.SenhaAtual) != usuario.Senha)
            {
                ModelState.AddModelError("SenhaAtual", "Senha incorreta");
                return View();
            }

            usuario.Senha = Hash.GerarHash(viewmodel.NovaSenha);
            db.Entry(usuario).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            return RedirectToAction("Index", "Painel");
        }

    }
}

