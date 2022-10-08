using API_WEB.Modelo;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace API_WEB.Context
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options)
        {}

        public DbSet<Usuario> Usuarios { get; set; } = null!;
    }
}
