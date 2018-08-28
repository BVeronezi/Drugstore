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

        public ViewResult Index(Carrinho carrinho, string returnurl)
        {
            return View(new CarrinhoViewModel
            {
                Carrinho = carrinho,
                ReturnUrl = returnurl
            });
        }

        public RedirectToRouteResult Adicionar(Carrinho carrinho, int produtoId, int quantidade, string returnUrl)
        {
            _repositorio = new ProdutosRepositorio();

            Produto produto = _repositorio.Produtos.
                FirstOrDefault(p => p.ProdutoId == produtoId);

            if (produto != null)
            {
                carrinho.AdicionarItem(produto, 1);

            }

            return RedirectToAction("Index", new { returnUrl });

        }

        private object ObterCarrinho()
        {
            Carrinho carrinho = (Carrinho)Session["Carrinho"];
            if (carrinho == null)
            {
                carrinho = new Carrinho();
                Session["Carrinho"] = carrinho;
            }

            return carrinho;
        }

        public RedirectToRouteResult Remover(Carrinho carrinho, int produtoId, string returnUrl)
        {

            _repositorio = new ProdutosRepositorio();

            Produto produto = _repositorio.Produtos
                .FirstOrDefault(p => p.ProdutoId == produtoId);

            if (produto != null)
            {
                carrinho.RemevorItem(produto);
            }

            return RedirectToAction("Index", new { returnUrl });
        }


        public ViewResult PedidoConcluido()
        {
            return View();
        }


    }
}