﻿using System;
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
        => optionsBuilder.UseSqlServer("Server=PC-77114\\MSSQLSERVER01;Database=psagot;Trusted_Connection=True;TrustServerCertificate=True");

    private readonly DbContext _context;


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.CourseId).HasName("PK__Courses__C92D71A742C778A6");

            entity.Property(e => e.Color).HasMaxLength(20);
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Day>(entity =>
        {
            entity.HasKey(e => e.DayId).HasName("PK__Days__BF3DD8C540FA3E21");

            entity.Property(e => e.Descr).HasMaxLength(10);
            entity.Property(e => e.Name).HasMaxLength(10);
        });

        modelBuilder.Entity<DaysForCourse>(entity =>
        {
            entity.HasKey(e => e.DaysForCourseId).HasName("PK__DaysForC__E8318208D335586E");

            entity.ToTable("DaysForCourse");

            entity.HasOne(d => d.Course).WithMany(p => p.DaysForCourses)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DaysForCo__Cours__6383C8BA");

            entity.HasOne(d => d.Day).WithMany(p => p.DaysForCourses)
                .HasForeignKey(d => d.DayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__DaysForCo__DayId__628FA481");
        });

        modelBuilder.Entity<Meeting>(entity =>
        {
            entity.HasKey(e => e.MeetingId).HasName("PK__Meetings__E9F9E94C2B845CDE");

            entity.Property(e => e.IsValid).HasDefaultValue(true);

            entity.HasOne(d => d.Day).WithMany(p => p.Meetings)
                .HasForeignKey(d => d.DayId)
                .HasConstraintName("FK__Meetings__DayId__7A672E12");

            entity.HasOne(d => d.Room).WithMany(p => p.Meetings)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Meetings__RoomId__797309D9");

            entity.HasOne(d => d.ScheduleForTopic).WithMany(p => p.Meetings)
                .HasForeignKey(d => d.ScheduleForTopicId)
                .HasConstraintName("FK__Meetings__Schedu__787EE5A0");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__Rooms__32863939B24E34D1");

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<ScheduleForTopic>(entity =>
        {
            entity.HasKey(e => e.ScheduleForTopicId).HasName("PK__Schedule__3483C9F7A127A09A");

            entity.ToTable("ScheduleForTopic");

            entity.HasOne(d => d.Day).WithMany(p => p.ScheduleForTopics)
                .HasForeignKey(d => d.DayId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScheduleF__DayId__71D1E811");

            entity.HasOne(d => d.Topic).WithMany(p => p.ScheduleForTopics)
                .HasForeignKey(d => d.TopicId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScheduleF__Topic__70DDC3D8");
        });

        modelBuilder.Entity<Topic>(entity =>
        {
            entity.HasKey(e => e.TopicId).HasName("PK__Topics__022E0F5D9CC5AF40");

            entity.Property(e => e.Name).HasMaxLength(50);

            entity.HasOne(d => d.Course).WithMany(p => p.Topics)
                .HasForeignKey(d => d.CourseId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Topics__CourseId__6D0D32F4");

            entity.HasOne(d => d.Teacher).WithMany(p => p.Topics)
                .HasForeignKey(d => d.TeacherId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Topics__TeacherI__6E01572D");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C2D1A147F");

            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(20);

            entity.HasOne(d => d.UserType).WithMany(p => p.Users)
                .HasForeignKey(d => d.UserTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Users__UserTypeI__6754599E");
        });

        modelBuilder.Entity<UserType>(entity =>
        {
            entity.HasKey(e => e.UserTypeId).HasName("PK__UserType__40D2D816CED5660F");

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
