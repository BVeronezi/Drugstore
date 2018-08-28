using System.ComponentModel.DataAnnotations;

namespace Drugstore.Web.ViewModels
{
    public class CadastroUsuarioViewModel
    {
        [Required(ErrorMessage = "Informe seu e-mail")]
        [Display(Name = "E-mail")]
        public string Email { get; set; }

        [Required(ErrorMessage ="Informe seu nome")]
        [MaxLength(100, ErrorMessage ="O nome deve ter até 100 caracteres")]
        [Display(Name = "Nome Completo")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Informe seu Login")]
        [MaxLength(50, ErrorMessage = "O nome deve ter até 50 caracteres")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Informe seu CPF")]
        public string CPF { get; set; }

        [Required(ErrorMessage = "Informe sua Data de Nascimento")]
        [Display(Name = "Data Nascimento")]
        public string DataNascto { get; set; }

        [Required(ErrorMessage = "Informe seu Telefone")]
        public int Telefone { get; set; }

        [Required(ErrorMessage ="Informe sua senha")]
        [DataType(DataType.Password)]
        [MaxLength(6, ErrorMessage ="A senha deve ter pelo menos 6 caracteres")]
        public string Senha { get; set; }

    }
}