using System.Data.Entity;

namespace Drugstore.Web.Models
{
    public class UsuariosContext : DbContext
    {
        public DbSet<Usuario> Usuarios { get; set; }

        public UsuariosContext(): base("Usuarios")
        {

        }
}
}