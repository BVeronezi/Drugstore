using Drugstore.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Drugstore.Web.Models
{
    [Table("Usuarios")]
    public class Usuario
    {
        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }

        [Key]
        [Required]
        [MaxLength(50)]
        public string Login { get; set; }

        [Required]
        [MaxLength(100)]
        public string Senha { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(100)]
        public string CPF { get; set; }

        //[MaxLength(100)]
        //public string Telefone { get; set; }

    }
}