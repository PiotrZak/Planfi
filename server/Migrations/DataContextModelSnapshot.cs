﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WebApi.Helpers;

namespace WebApi.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityByDefaultColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 63)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("WebApi.Data.Entities.Exercise", b =>
                {
                    b.Property<string>("ExerciseId")
                        .HasColumnType("text");

                    b.Property<string>("CategoryId")
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .HasMaxLength(3600000)
                        .HasColumnType("character varying(3600000)");

                    b.Property<List<byte[]>>("Files")
                        .HasColumnType("bytea[]");

                    b.Property<string>("Name")
                        .HasMaxLength(160)
                        .HasColumnType("character varying(160)");

                    b.Property<string>("PlanId")
                        .HasColumnType("text");

                    b.Property<int>("Repeats")
                        .HasColumnType("integer");

                    b.Property<int>("Series")
                        .HasColumnType("integer");

                    b.Property<int>("Times")
                        .HasColumnType("integer");

                    b.Property<int>("Weight")
                        .HasColumnType("integer");

                    b.HasKey("ExerciseId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("PlanId");

                    b.ToTable("Exercises");

                    b.HasData(
                        new
                        {
                            ExerciseId = "a",
                            CategoryId = "1",
                            Description = "W podciąganiu na drążku podchwytem, sam chwyt nie różni się od tego w innych ćwiczeniach wielostawowych z obciążeniem. Podchwyt to oczywiście ustawienie rąk w supinacji, czyli wewnętrzną częścią dłoni w naszą stronę. Drążek chwytamy jak najmocniej i oplatając go kciukiem.",
                            Name = "Podciąganie nad chwyt",
                            Repeats = 0,
                            Series = 7,
                            Times = 4,
                            Weight = 0
                        },
                        new
                        {
                            ExerciseId = "b",
                            CategoryId = "1",
                            Description = "Nasze mięśnie czworogłowe dają z siebie wszystko już na samym dole przysiadu, jako że przy siadach high bar ciężar jest mniejszy, kolana mogą wysunąć się trochę bardziej do przodu, bo moment siły potrzebny do wyprostowania kolana jest taki sam, jak przy siadzie low bar z cięższą sztangą.",
                            Name = "Przysiady ze sztangą (high bar)",
                            Repeats = 0,
                            Series = 7,
                            Times = 4,
                            Weight = 45
                        },
                        new
                        {
                            ExerciseId = "c",
                            CategoryId = "1",
                            Description = "Hip thrust, czyli wypychanie bioder w podporze grzbietem o ławeczkę oraz glute bridge, czyli unoszenie bioder w pozycji leżącej to aktualnie jedne z najskuteczniejszych ćwiczeń na mięśnie pośladkowe!",
                            Name = "Glut bridge jednorożec",
                            Repeats = 0,
                            Series = 9,
                            Times = 3,
                            Weight = 15
                        },
                        new
                        {
                            ExerciseId = "d",
                            CategoryId = "1",
                            Description = "Utrzymuj prawidłową pozycję wyjściową, napinaj mocno mięśnie nóg, pośladki oraz brzuch, utrzymaj pozycję przez wyznaczony czas, wykonaj izometryczny skurcz mięśni oraz oddychaj głęboko.",
                            Name = "Deska bokiem",
                            Repeats = 0,
                            Series = 27,
                            Times = 2,
                            Weight = 0
                        },
                        new
                        {
                            ExerciseId = "e",
                            CategoryId = "1",
                            Description = "Dziękuję bardzo za odpowiedź! czy mogę wykonywać wznosy bokiem hantlami bo chce zacząć chodzić na siłownie,mialem przerwę i chce znowu zacząć chodzić. Czy jakoś te wznosy mogą przyhamowac wzrost czy coś i czy mogę je wykonywać?",
                            Name = "Spiętki",
                            Repeats = 0,
                            Series = 7,
                            Times = 4,
                            Weight = 0
                        },
                        new
                        {
                            ExerciseId = "f",
                            CategoryId = "2",
                            Description = "Spacer farmera (ang. Farmer's Walk) – konkurencja zawodów siłaczy. Zadaniem zawodnika jest podniesienie z podłoża dwóch ciężarów (tzw. „walizek”) – po jednym w każdej z dłoni – i pokonaniu z obydwoma dystansu.",
                            Name = "Spacer farmera",
                            Repeats = 0,
                            Series = 0,
                            Times = 0,
                            Weight = 25
                        },
                        new
                        {
                            ExerciseId = "g",
                            CategoryId = "2",
                            Description = "",
                            Name = "Martwy ciąg sumo",
                            Repeats = 0,
                            Series = 0,
                            Times = 0,
                            Weight = 35
                        },
                        new
                        {
                            ExerciseId = "h",
                            CategoryId = "2",
                            Description = "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.",
                            Name = "Martwy Ciąg",
                            Repeats = 0,
                            Series = 0,
                            Times = 0,
                            Weight = 43
                        },
                        new
                        {
                            ExerciseId = "i",
                            CategoryId = "2",
                            Description = "W pozycji górnej ćwiczenia napnij łydki.Powoli opuść się z powrotem do pozycji wyjściowej, abyś czuł pełne rozciąganie w łydkach.Nie uginaj kolan, by wytworzyć pęd podczas unoszenia się na palcach stóp.",
                            Name = "Uginanie na łydki stojąc",
                            Repeats = 0,
                            Series = 27,
                            Times = 2,
                            Weight = 35
                        },
                        new
                        {
                            ExerciseId = "j",
                            CategoryId = "3",
                            Description = "1) Połóż się na ławce płaskiej. 2) Stopy ustaw w lekkim rozkroku i mocno zaprzyj o podłoże. 3) Chwyć sztangę nachwytem (palce wskazują przód, kciuki skierowane do środka) na taką szerokość, aby w połowie wykonywania ruchu kąt między ramieniem a przedramieniem wynosił 90 stopni.",
                            Name = "Wyciskanie na płaskiej",
                            Repeats = 0,
                            Series = 2,
                            Times = 5,
                            Weight = 60
                        },
                        new
                        {
                            ExerciseId = "k",
                            CategoryId = "3",
                            Description = "Wznosy bokiem, wznosy sztangielek bokiem, lub odwodzenie ramion w bok ze sztangielkami (ang. Shoulder Fly, dumbbell deltoid raise) - ćwiczenie fizyczne polegające na podnoszeniu ramionami ciężaru (najczęściej hantli) stosowane podczas treningu kulturystycznego.",
                            Name = "Wznosy bokiem",
                            Repeats = 0,
                            Series = 3,
                            Times = 5,
                            Weight = 25
                        },
                        new
                        {
                            ExerciseId = "l",
                            CategoryId = "3",
                            Description = "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.",
                            Name = "Martwy ciąg sumo",
                            Repeats = 0,
                            Series = 0,
                            Times = 0,
                            Weight = 35
                        },
                        new
                        {
                            ExerciseId = "m",
                            CategoryId = "3",
                            Description = "1) Zajmij miejsce na maszynie, dostosowując ją do swojego wzrostu.Kończyny dolne wyprostowane, wałek maszyny znajduje się kilka centymetrów poniżej łydek.Chwyć za uchwyty znajdujące się po bokach siedziska.",
                            Name = "Uginanie na dwójki na maszynie",
                            Repeats = 0,
                            Series = 0,
                            Times = 0,
                            Weight = 43
                        },
                        new
                        {
                            ExerciseId = "n",
                            CategoryId = "3",
                            Description = " Z pozycji, w której stopa jest mocno zadarta do góry, pięta skrajnie obniżona, palce wskazują sufit, a łydka jest mocno rozciągnięta, odpychaj się od podwyższenia poprzez mocne wspięcie na palce i napięcie łydek.",
                            Name = "Uginanie na łydki stojąc",
                            Repeats = 0,
                            Series = 27,
                            Times = 2,
                            Weight = 35
                        },
                        new
                        {
                            ExerciseId = "o",
                            CategoryId = "3",
                            Description = "musculus triceps brachii) - mięsień zajmujący całą powierzchnię tylną ramienia i należący do tylnej grupy mięśni ramienia, rozpięty między łopatką i kością",
                            Name = "Triceps",
                            Repeats = 0,
                            Series = 5,
                            Times = 1,
                            Weight = 7
                        });
                });

            modelBuilder.Entity("WebApi.Data.Entities.Plan", b =>
                {
                    b.Property<string>("PlanId")
                        .HasColumnType("text");

                    b.Property<string>("CreatorId")
                        .HasColumnType("text");

                    b.Property<string>("CreatorName")
                        .HasColumnType("text");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("PlanId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Plans");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Users.Role", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Role");

                    b.HasData(
                        new
                        {
                            Id = "1",
                            Name = "Trainer"
                        });
                });

            modelBuilder.Entity("WebApi.Data.Entities.Users.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<byte[]>("Avatar")
                        .HasColumnType("bytea");

                    b.Property<string>("Email")
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .HasColumnType("text");

                    b.Property<bool>("IsActivated")
                        .HasColumnType("boolean");

                    b.Property<string>("LastName")
                        .HasColumnType("text");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea");

                    b.Property<DateTime>("PasswordReset")
                        .HasColumnType("timestamp without time zone");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("bytea");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<string>("ResetToken")
                        .HasColumnType("text");

                    b.Property<DateTime?>("ResetTokenExpires")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.Property<string>("Token")
                        .HasColumnType("text");

                    b.Property<string>("VerificationToken")
                        .HasColumnType("text");

                    b.HasKey("UserId");

                    b.HasIndex("OrganizationId");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = "u1",
                            Email = "tgianelli0@eventbrite.com",
                            FirstName = "Teodoor",
                            IsActivated = true,
                            LastName = "Gianelli",
                            OrganizationId = "O1",
                            Password = "Teodor",
                            PasswordReset = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PhoneNumber = "555555555",
                            Token = "t-user"
                        },
                        new
                        {
                            UserId = "o2u1",
                            Email = "jmeachem0@eventbrite.com",
                            FirstName = "Jacklyn",
                            IsActivated = true,
                            LastName = "Meachem",
                            OrganizationId = "O2",
                            Password = "Jacklyn",
                            PasswordReset = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PhoneNumber = "555555555",
                            Token = "t-user"
                        },
                        new
                        {
                            UserId = "o3u1",
                            Email = "thilldrupe@berkeley.edu",
                            FirstName = "Titus",
                            IsActivated = true,
                            LastName = "Hilldrup",
                            OrganizationId = "O3",
                            Password = "Titus",
                            PasswordReset = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            PhoneNumber = "555555555",
                            Token = "t-user"
                        });
                });

            modelBuilder.Entity("WebApi.Data.Entities.UsersPlans", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("PlanId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "PlanId");

                    b.HasIndex("PlanId");

                    b.ToTable("UsersPlans");
                });

            modelBuilder.Entity("WebApi.Data.ViewModels.UsersTrainers", b =>
                {
                    b.Property<string>("ClientId")
                        .HasColumnType("text");

                    b.Property<string>("TrainerId")
                        .HasColumnType("text");

                    b.HasKey("ClientId", "TrainerId");

                    b.HasIndex("TrainerId");

                    b.ToTable("UsersTrainers");
                });

            modelBuilder.Entity("WebApi.Entities.Category", b =>
                {
                    b.Property<string>("CategoryId")
                        .HasColumnType("text");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .HasColumnType("text");

                    b.HasKey("CategoryId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            CategoryId = "1",
                            Title = "Amatorskie"
                        },
                        new
                        {
                            CategoryId = "2",
                            Title = "Średnio-Zaawansowane"
                        },
                        new
                        {
                            CategoryId = "3",
                            Title = "Profesjonalistyczne"
                        });
                });

            modelBuilder.Entity("WebApi.Entities.Organization", b =>
                {
                    b.Property<string>("OrganizationId")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("OrganizationId");

                    b.ToTable("Organizations");

                    b.HasData(
                        new
                        {
                            OrganizationId = "O1",
                            Name = "Apple"
                        },
                        new
                        {
                            OrganizationId = "O2",
                            Name = "Google"
                        },
                        new
                        {
                            OrganizationId = "O3",
                            Name = "Microsoft"
                        });
                });

            modelBuilder.Entity("WebApi.Models.ChatRoom", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ChatRooms");
                });

            modelBuilder.Entity("WebApi.Models.Message", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Contents")
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("PostedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("RoomId")
                        .HasColumnType("uuid");

                    b.Property<string>("UserName")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Exercise", b =>
                {
                    b.HasOne("WebApi.Entities.Category", null)
                        .WithMany("Exercises")
                        .HasForeignKey("CategoryId");

                    b.HasOne("WebApi.Data.Entities.Plan", null)
                        .WithMany("Exercises")
                        .HasForeignKey("PlanId");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Plan", b =>
                {
                    b.HasOne("WebApi.Entities.Organization", null)
                        .WithMany("Plans")
                        .HasForeignKey("OrganizationId");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Users.User", b =>
                {
                    b.HasOne("WebApi.Entities.Organization", null)
                        .WithMany("Users")
                        .HasForeignKey("OrganizationId");

                    b.HasOne("WebApi.Data.Entities.Users.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("WebApi.Data.Entities.UsersPlans", b =>
                {
                    b.HasOne("WebApi.Data.Entities.Plan", "Plan")
                        .WithMany("Users")
                        .HasForeignKey("PlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Data.Entities.Users.User", "User")
                        .WithMany("Plans")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Plan");

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebApi.Data.ViewModels.UsersTrainers", b =>
                {
                    b.HasOne("WebApi.Data.Entities.Users.User", "Client")
                        .WithMany("UsersTrainers")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Data.Entities.Users.User", "Trainer")
                        .WithMany()
                        .HasForeignKey("TrainerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Trainer");
                });

            modelBuilder.Entity("WebApi.Entities.Category", b =>
                {
                    b.HasOne("WebApi.Entities.Organization", null)
                        .WithMany("Categories")
                        .HasForeignKey("OrganizationId");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Plan", b =>
                {
                    b.Navigation("Exercises");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Users.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Users.User", b =>
                {
                    b.Navigation("Plans");

                    b.Navigation("UsersTrainers");
                });

            modelBuilder.Entity("WebApi.Entities.Category", b =>
                {
                    b.Navigation("Exercises");
                });

            modelBuilder.Entity("WebApi.Entities.Organization", b =>
                {
                    b.Navigation("Categories");

                    b.Navigation("Plans");

                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
