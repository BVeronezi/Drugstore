using System.ComponentModel.DataAnnotations;

namespace Drugstore.Web.ViewModels
{
    public class CadastroUsuarioViewModel
    {
        [Required(ErrorMessage = "Campo obrigatório")]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(100, ErrorMessage ="O nome deve ter até 100 caracteres")]
        [Display(Name = "Nome")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [Display(Name = "Sobrenome")]
        public string Sobrenome { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [MaxLength(50, ErrorMessage = "O nome deve ter até 50 caracteres")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        public string CPF { get; set; }
        
        [Required(ErrorMessage = "Campo obrigatório")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

    }
}