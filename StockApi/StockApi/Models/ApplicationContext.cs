using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace StockApi.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext():base("name=DefaultConnectionString")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<ApplicationContext,
                                        Migrations.Configuration>("DefaultConnectionString"));
        }

        public DbSet<Product> Products { get; set; }
    }
}