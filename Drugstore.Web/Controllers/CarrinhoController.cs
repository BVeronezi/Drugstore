using Drugstore.Dominio.Entidades;
using Drugstore.Dominio.Repositorio;
using Drugstore.Web.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace Drugstore.Web.Controllers
{
    public class CarrinhoController : Controller
    {
        private ProdutosRepositorio _repositorio;

        public ViewResult Index(string returnurl)
        {
            return View(new CarrinhoViewModel
            {
                Carrinho = ObterCarrinho(),
                ReturnUrl = returnurl
            });
        }

        public PartialViewResult Resumo()
        {
            Carrinho carrinho = ObterCarrinho();
            return PartialView(carrinho);
        }

        public RedirectToRouteResult Adicionar(int produtoId, string returnUrl)
        {
            _repositorio = new ProdutosRepositorio();

            Produto produto = _repositorio.Produtos.
                FirstOrDefault(p => p.ProdutoId == produtoId);

            if (produto != null)
            {
                ObterCarrinho().AdicionarItem(produto, 1);
            }

            return RedirectToAction("Index", new { returnUrl });

        }

        private Carrinho ObterCarrinho()
        {
            Carrinho carrinho = (Carrinho)Session["Carrinho"];
            if (carrinho == null)
            {
                carrinho = new Carrinho();
                Session["Carrinho"] = carrinho;
            }
            return carrinho;
        }

        public RedirectToRouteResult Remover(int produtoId, string returnUrl)
        {
            _repositorio = new ProdutosRepositorio();

            Produto produto = _repositorio.Produtos
                .FirstOrDefault(p => p.ProdutoId == produtoId);

            if (produto != null)
            {
                ObterCarrinho().RemevorItem(produto);
            }

            return RedirectToAction("Index", new { returnUrl });
        }

        public ViewResult FecharPedido()
        {
            return View(new Pedido());    
        }

        [HttpPost]
        public ViewResult FecharPedido(Pedido pedido)
        {
            return View(new Pedido());
        }
    }
}