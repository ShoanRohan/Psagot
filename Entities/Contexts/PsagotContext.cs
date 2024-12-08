using System;
using System.Collections.Generic;
using Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace Entities.Contexts;

public partial class PsagotContext : DbContext
{
    public PsagotContext()
    {
    }

    public PsagotContext(DbContextOptions<PsagotContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Course> Courses { get; set; }

    public virtual DbSet<Day> Days { get; set; }

    public virtual DbSet<DaysForCourse> DaysForCourses { get; set; }

    public virtual DbSet<Meeting> Meetings { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<ScheduleForTopic> ScheduleForTopics { get; set; }

    public virtual DbSet<Topic> Topics { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserType> UserTypes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=psagot;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Courses__C92D71A77B1AA7BE");

            entity.Property(e => e.Color).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Day>(entity =>
        {
            entity.HasKey(e => e.DayId).HasName("PK__Days__BF3DD8C562BDF576");

            entity.Property(e => e.Descr).HasMaxLength(10);
            entity.Property(e => e.Name).HasMaxLength(10);
        });

        modelBuilder.Entity<DaysForCourse>(entity =>
        {
            entity.HasKey(e => e.DaysForCourseId).HasName("PK__DaysForC__E83182089ACCA154");

            entity.ToTable("DaysForCourse");

            entity.HasOne(d => d.Course).WithMany(p => p.DaysForCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DaysForCo__Cours__3B75D760");

            entity.HasOne(d => d.Day).WithMany(p => p.DaysForCourses)
                .HasForeignKey(d => d.DayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DaysForCo__DayId__3A81B327");
        });

        modelBuilder.Entity<Meeting>(entity =>
        {
            entity.HasKey(e => e.MeetingId).HasName("PK__Meetings__E9F9E94C6C0FAD23");

            entity.Property(e => e.IsValid).HasDefaultValue(true);

            entity.HasOne(d => d.Day).WithMany(p => p.Meetings)
                .HasForeignKey(d => d.DayId)
                .HasConstraintName("FK__Meetings__DayId__5441852A");

            entity.HasOne(d => d.Room).WithMany(p => p.Meetings)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Meetings__RoomId__534D60F1");

            entity.HasOne(d => d.ScheduleForTopic).WithMany(p => p.Meetings)
                .HasForeignKey(d => d.ScheduleForTopicId)
                .HasConstraintName("FK__Meetings__Schedu__52593CB8");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__Rooms__32863939D51D708D");

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<ScheduleForTopic>(entity =>
        {
            entity.HasKey(e => e.ScheduleForTopicId).HasName("PK__Schedule__3483C9F7065E6BAA");

            entity.ToTable("ScheduleForTopic");

            entity.HasOne(d => d.Day).WithMany(p => p.ScheduleForTopics)
                .HasForeignKey(d => d.DayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScheduleF__DayId__4BAC3F29");

            entity.HasOne(d => d.Topic).WithMany(p => p.ScheduleForTopics)
                .HasForeignKey(d => d.TopicId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScheduleF__Topic__4AB81AF0");
        });

        modelBuilder.Entity<Topic>(entity =>
        {
            entity.HasKey(e => e.TopicId).HasName("PK__Topics__022E0F5D2C75F787");

            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasOne(d => d.Course).WithMany(p => p.Topics)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Topics__CourseId__46E78A0C");

            entity.HasOne(d => d.Teacher).WithMany(p => p.Topics)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Topics__TeacherI__47DBAE45");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C80E61E78");

            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(20);

            entity.HasOne(d => d.UserType).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Users__UserTypeI__412EB0B6");
        });

        modelBuilder.Entity<UserType>(entity =>
        {
            entity.HasKey(e => e.UserTypeId).HasName("PK__UserType__40D2D8169AF85846");

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
