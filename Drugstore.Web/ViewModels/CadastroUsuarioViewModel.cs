using System.ComponentModel.DataAnnotations;

namespace Drugstore.Web.ViewModels
{
    public class CadastroUsuarioViewModel
    {
        [Required(ErrorMessage = "Informe seu e-mail")]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Informe seu nome")]
        [MaxLength(100, ErrorMessage ="O nome deve ter até 100 caracteres")]
        [Display(Name = "Nome")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Informe seu Sobrenome")]
        [Display(Name = "Sobrenome")]
        public string Sobrenome { get; set; }

        [Required(ErrorMessage = "Informe seu Login")]
        [MaxLength(50, ErrorMessage = "O nome deve ter até 50 caracteres")]
        public string Login { get; set; }

        [Required(ErrorMessage = "informe seu cpf")]
        public int CPF { get; set; }
        
        [Required(ErrorMessage = "Informe sua senha")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

    }
}