using Drugstore.Dominio.Entidades;
using Drugstore.Dominio.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Drugstore.Web.Controllers
{
    public class AdministradorController : Controller
    {
        private AdministradoresRepositorio _repositorio;

        // GET: Autenticacao Admin
        public ActionResult LoginAdmin(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View(new Administrador());
        }

        [HttpPost]
        public ActionResult LoginAdmin(Administrador administrador, string returnUrl)
        {
            _repositorio = new AdministradoresRepositorio();

            if (ModelState.IsValid)
            {
                Administrador admin = _repositorio.ObterAdministrador(administrador);

                if (admin != null)
                {
                    if (!Equals(administrador.Senha, admin.Senha))
                    {
                        ModelState.AddModelError("", "Senha não confere!");
                    }
                    else
                    {
                        FormsAuthentication.SetAuthCookie(admin.Login, false);

                        if (Url.IsLocalUrl(returnUrl)
                            && returnUrl.Length > 1
                            && returnUrl.StartsWith("/")
                            && !returnUrl.StartsWith("//")
                            && !returnUrl.StartsWith("/\\"))
                        {
                            return Redirect(returnUrl);
                        }

                        return RedirectToAction("Index", "Produtos");


                    }
                }
                else
                {
                    ModelState.AddModelError("", "Administrador não localizado"); //
                }
            }

            return View(new Administrador());
        }
        public ActionResult LogoutAdmin()
        {
            FormsAuthentication.SignOut();
            Session.Clear();
            Session.Abandon();

            // Clear authentication cookie
            HttpCookie rFormsCookie = new HttpCookie(FormsAuthentication.FormsCookieName, "");
            rFormsCookie.Expires = DateTime.Now.AddYears(-1);
            Response.Cookies.Add(rFormsCookie);

            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetNoStore();
            return RedirectToAction("Index", "Produtos");
        }
    }
}

