﻿using Drugstore.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Drugstore.Dominio.Repositorio
{
    public class CategoriaRepositorio
    {
        private readonly EfDbContext _context = new EfDbContext();

        public IEnumerable<Categoria> GetCategorias()
        {
            return _context.Categorias.OrderBy(c => c.CategoriaDescricao);
        }
        
    }
}
