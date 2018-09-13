using Drugstore.Dominio.Entidades;
using Drugstore.Dominio.Entidades.Pagamento;
using Drugstore.Dominio.Repositorio;
using Drugstore.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web.Mvc;
using System.Xml;
using System.Xml.Serialization;

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

        public PartialViewResult Resumo(Carrinho carrinho)
        {
            return PartialView(carrinho);
        }

        public RedirectToRouteResult Adicionar(Carrinho carrinho, int produtoId, int quantidade, string returnUrl)
        {
            _repositorio = new ProdutosRepositorio();

            Produto produto = _repositorio.Produtos.
                FirstOrDefault(p => p.ProdutoId == produtoId);

            if (produto != null)
            {
                carrinho.AdicionarItem(produto, quantidade);
            }
            return RedirectToAction("Index", new { returnUrl });
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

        [Authorize]
        public ViewResult FecharPedido()
        {
            return View(new Pedido());
        }

        [HttpPost]
        [Authorize]
        public ViewResult FecharPedido (Carrinho carrinho, Pedido pedido)
        {
            EmailConfiguracoes email = new EmailConfiguracoes
            {
                EscreverArquivo = bool.Parse(ConfigurationManager.AppSettings["Email.EscreverArquivo"] ?? "true")
            };

            EmailProcessarPedido emailProcessarPedido = new EmailProcessarPedido(email);

            if (!carrinho.ItensCarrinho.Any())
            {
                ModelState.AddModelError("", "Não foi possível concluir o pedido, seu carrinho está vazio.");
            }

            if (ModelState.IsValid)
            {
                emailProcessarPedido.ProcessarPedido(carrinho, pedido);
                carrinho.LimparCarrinho();

                //using (var client = new HttpClient())
                //{
                //    client.BaseAddress = new System.Uri("https://ws.sandbox.pagseguro.uol.com.br");
                //    client.DefaultRequestHeaders.Clear();

                //    var pedidoPagSeguro = new PagamentoPagSeguro
                //        (pedido, "http://localhost:59283/CarrinhoPedidoConcluido?pedidoId=" + pedido.Id, 
                //        Request.UserHostAddress,
                //        null);
                //    XmlSerializer serializer = new XmlSerializer(typeof(PagamentoPagSeguro));

                //    StreamContent content;
                //    using (var stream = new MemoryStream())
                //    {
                //        using (XmlWriter textWriter = XmlWriter.Create(stream))
                //        {
                //            serializer.Serialize(textWriter, pedidoPagSeguro);
                //        }

                //        stream.Seek(0, SeekOrigin.Begin);
                //        content = new StreamContent(stream);
                //        var test = await content.ReadAsStringAsync();

                //        content.Headers.Add("Content-Type", "application/xml");
                //        var response = await client.PostAsync(
                //                                   "v2/checkouts-qrcode/?email=bds.veronezi@gmail.com&token=8BF8F5C11A214599912ED733EC4C885D",
                //                                   content);
                //        if (response.IsSuccessStatusCode)
                //        {
                //            string resultContent = await response.Content.ReadAsStringAsync();
                //            XmlSerializer returnSerializer = new XmlSerializer(typeof(ReceivedPagSeguro));
                //            using (TextReader reader = new StringReader(resultContent))
                //            {
                //                var retorno = (ReceivedPagSeguro)returnSerializer.Deserialize(reader);
                //                return Redirect("https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=" + retorno.Code);
                //            }
                //        }
                //    }
                

                return View("PedidoConcluido");
            }
            else
            {
                return View(pedido);
            }
        }
        public ViewResult PedidoConcluido(Carrinho carrinho, int pedidoId)
        {
            return View();
        }
    }
}