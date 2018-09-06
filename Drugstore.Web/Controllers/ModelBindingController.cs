using Drugstore.Dominio.Entidades;
using System.Web.Mvc;

namespace Drugstore.Web.Controllers
{
    public class ModelBindingController : Controller
    {
        // GET: ModelBinding
        public ActionResult Index()
        {
            return View(new Pessoa());
        }

        [HttpPost]
        public ActionResult Editar([Bind(Include = "Nome")] Pessoa produt)
        {
            return RedirectToAction("Index");
        }
    }
}