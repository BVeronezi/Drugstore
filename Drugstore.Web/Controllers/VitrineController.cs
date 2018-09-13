using Drugstore.Dominio.Entidades;
using Drugstore.Dominio.Repositorio;
using Drugstore.Web.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace Drugstore.Web.Controllers
{
    public class VitrineController : Controller
    {
        private ProdutosRepositorio _repositorio;
        public int ProdutosPorPagina = 6;

        public ViewResult ListaProdutos(string categoria, int pagina = 1)
        {
            _repositorio = new ProdutosRepositorio();

            ProdutosViewModel model = new ProdutosViewModel
            {
                Produtos = _repositorio.Produtos
                    .Where(p => categoria == null || p.Categoria == categoria)
                    .OrderBy(p => p.Descricao)
                    .Skip((pagina - 1) * ProdutosPorPagina)
                    .Take(ProdutosPorPagina),

                Paginacao = new Paginacao
                {
                    PaginaAtual = pagina,
                    ItensPorPagina = ProdutosPorPagina,
                    ItensTotal = _repositorio.Produtos.Count()
                },

                CategoriaAtual = categoria
            };
            return View(model);
        }

        [Route("Vitrine/ObterImagem/{produtoid}")]
        public FileContentResult ObterImagem(int produtoId)
        {
            _repositorio = new ProdutosRepositorio();
            Produto prod = _repositorio.Produtos
                .FirstOrDefault(p => p.ProdutoId == produtoId);

            if (prod != null)
            {
                return File(prod.Imagem, prod.ImageMimeType);
            }


            return null;
        }

        [Route("DetalhesProduto/{id}/{produto}")]
        public ViewResult Detalhes(int id)
        {
            _repositorio = new ProdutosRepositorio();
            Produto produto = _repositorio.GetProduto(id);
            return View(produto);
        }


    }
}