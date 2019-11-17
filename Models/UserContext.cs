using Microsoft.EntityFrameworkCore;
using restaurant_order.Models;

namespace restaurant_order.Models {
    public class UserContext : DbContext {
        public UserContext (DbContextOptions<UserContext> options) : base (options) { }
        public DbSet<AuthenticateModel> Users { get; set; }

    }
}