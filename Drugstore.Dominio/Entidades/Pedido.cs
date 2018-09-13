using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Drugstore.Dominio.Entidades
{
    public class Pedido 
    {
        [Required(ErrorMessage = "Informe seu nome")]
        [Display(Name = "Nome Completo:")]
        public string NomeCliente { get; set; }

        // Documento
        [Required]
        [Display(Name = "RG:")]
        public string Documento { get; set; }

        [Display(Name = "CEP:")]
        public string Cep { get; set; }

        [Required(ErrorMessage = "Informe seu endereço")]
        [Display(Name = "Endereço:")]
        public string Endereco { get; set; }

        [Required(ErrorMessage = "Informe seu Número")]
        [Display(Name = "Número:")]
        public string Numero { get; set; }

        [Display(Name = "Complemento:")]
        public string Complemento { get; set; }

        [Required(ErrorMessage = "Informe seu bairro")]
        [Display(Name = "Bairro:")]
        public string Bairro { get; set; }

        [Required(ErrorMessage = "Informe sua cidade")]
        [Display(Name = "Cidade:")]
        public string Cidade { get; set; }

        [Required(ErrorMessage = "Informe seu estado")]
        [Display(Name = "Estado:")]
        public string Estado { get; set; }

        [Display(Name = "Email:")]
        [Required(ErrorMessage = "Informe seu email")]
        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; }

        [Display(Name = "Telefone:")]
        [Required(ErrorMessage = "Informe seu Telefone")]
        public string Telefone { get; set; }

        [HiddenInput(DisplayValue = false)]
        public string CodigoArea { get; set; }

        [HiddenInput(DisplayValue = true)]
        public int Id { get; set; }

        [HiddenInput(DisplayValue = false)]
        public string ProdutosPedido { get; set; }

        // Endereço
        [HiddenInput(DisplayValue = false)]
        public virtual EnderecoCliente EnderecoCliente { get; set; }
    }
}
