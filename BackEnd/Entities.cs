using Microsoft.EntityFrameworkCore;
using DbMigration.Domains;

namespace BackEnd
{
  public class Entities : DbContext
  {
    // private readonly ICurrentUserService _currentUserService;
    // private readonly IDateTime _dateTime;

    public Entities(DbContextOptions<Entities> options)
      : base(options)
    {}

    /*
    public Entities(
      DbContextOptions<Entities> options, 
      ICurrentUserService currentUserService,
      DateTime dateTime)
      : base(options)
    {
      _currentUserService = currentUserService;
      _dateTime = dateTime;
    }
    */

    public DbSet<Customer> Customers { get; set; }

    public DbSet<Order> Orders { get; set; }

    /*
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
      foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
      {
        switch (entry.State)
        {
          case EntityState.Added:
            entry.Entity.CreatedBy = _currentUserService.UserId;
            entry.Entity.Created = _dateTime.Now;
            break;
          case EntityState.Modified:
            entry.Entity.LastModifiedBy = _currentUserService.UserId;
            entry.Entity.LastModified = _dateTime.Now;
            break;
        }
      }

      return base.SaveChangesAsync(cancellationToken);
    }
    */

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.ApplyConfigurationsFromAssembly(typeof(Entities).Assembly);
    }
  }

  public static class EntitiesDi
  {
    public static IServiceCollection AddDatabase(this IServiceCollection sc/*, IConfiguration config*/)
    {
      sc.AddDbContext<Entities>(options =>
          // options.UseSqlServer()
          options.UseSqlServer("Server=10.252.150.147;Database=BackEnd;User Id=sa;Password=fWRjFFTLjccQW95lcZON;Encrypt=true;trustServerCertificate=true;")
        );
      return sc;
    }

  }
}