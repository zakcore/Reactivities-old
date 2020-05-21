﻿using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext:IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options):base(options)
        {
            
        }
        public DbSet <Value> Values { get; set; }
        public DbSet <Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities{get;set;}
        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);
            builder.Entity<Value>().HasData(
                new Value{Id=1,Name="zak"},
                new Value{Id=2,Name="amel"},
                new Value{Id=3,Name="youcef"}
            );

            builder.Entity<UserActivity>(x => x.HasKey(ua => new{ua.AppUserId,ua.ActivityId}));
            builder.Entity<UserActivity>()
            .HasOne(u => u.AppUser)
            .WithMany(u =>u.UserActivities).
            HasForeignKey(u => u.AppUserId);
            
            builder.Entity<UserActivity>().HasOne(u => u.Activity)
            .WithMany(u =>u.UserActivities).
            HasForeignKey(u => u.ActivityId);


        }
    }
}
