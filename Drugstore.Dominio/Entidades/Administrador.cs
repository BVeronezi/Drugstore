using System;
using System.ComponentModel.DataAnnotations;

namespace Drugstore.Dominio.Entidades
{
    public class Administrador
    {
        public int Id { get; set; }
    
        [Display(Name = "Login:")]
        public string Login { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Senha:")]
        public string Senha { get; set; }

        public DateTime UltimoAcesso { get; set; }
    }
}
