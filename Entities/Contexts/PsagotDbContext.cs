using System;
using System.Collections.Generic;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Entities.Contexts;

public partial class PsagotDbContext : DbContext
{
    public PsagotDbContext()
    {
    }

    public PsagotDbContext(DbContextOptions<PsagotDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Lecture> Lectures { get; set; }

    public virtual DbSet<UserType> UserTypes { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Lecture>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Lectures__3214EC079AFB7810");

            entity.Property(e => e.Name).HasMaxLength(200);
        });

        modelBuilder.Entity<UserType>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserType__3214EC072EBE242C");

            entity.ToTable("UserType");

            entity.Property(e => e.Name).HasMaxLength(20);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
