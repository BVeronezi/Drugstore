using Drugstore.Dominio.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI;

namespace Drugstore.Web.V2.Controllers
{
    public class CategoriaController : Controller
    {
        private CategoriaRepositorio _repositorio;

        public JsonResult GetMedicamentos()
        {
            _repositorio = new CategoriaRepositorio();
            var cat = _repositorio.GetCategorias();

            var categoria = from c in cat
                            select new
                            {
                                c.CategoriaDescricao,
                                CategoriaDescricaoSeo = c.CategoriaDescricao.ToSeoUrl(),
                                c.CategoriaCodigo

                            };

            return Json(categoria, JsonRequestBehavior.AllowGet);
        }
    }
}