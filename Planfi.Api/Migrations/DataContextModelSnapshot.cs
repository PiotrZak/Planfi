﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using WebApi.Helpers;

#nullable disable

namespace PlanfiApi.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0-rc.2.21480.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("PlanfiApi.Data.Entities.Category", b =>
                {
                    b.Property<string>("CategoryId")
                        .HasColumnType("text")
                        .HasColumnName("category_id");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("text")
                        .HasColumnName("organization_id");

                    b.Property<string>("Title")
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("CategoryId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("categories");

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

            modelBuilder.Entity("PlanfiApi.Data.Entities.Exercise", b =>
                {
                    b.Property<string>("ExerciseId")
                        .HasColumnType("text")
                        .HasColumnName("exercise_id");

                    b.Property<string>("CategoryId")
                        .HasColumnType("text")
                        .HasColumnName("category_id");

                    b.Property<string>("Description")
                        .HasMaxLength(3600000)
                        .HasColumnType("character varying(3600000)")
                        .HasColumnName("description");

                    b.Property<List<byte[]>>("Files")
                        .HasColumnType("bytea[]")
                        .HasColumnName("files");

                    b.Property<string>("Name")
                        .HasMaxLength(160)
                        .HasColumnType("character varying(160)")
                        .HasColumnName("name");

                    b.Property<string>("PlanId")
                        .HasColumnType("text")
                        .HasColumnName("plan_id");

                    b.HasKey("ExerciseId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("PlanId");

                    b.ToTable("exercises");

                    b.HasData(
                        new
                        {
                            ExerciseId = "a",
                            CategoryId = "1",
                            Description = "W podciąganiu na drążku podchwytem, sam chwyt nie różni się od tego w innych ćwiczeniach wielostawowych z obciążeniem. Podchwyt to oczywiście ustawienie rąk w supinacji, czyli wewnętrzną częścią dłoni w naszą stronę. Drążek chwytamy jak najmocniej i oplatając go kciukiem.",
                            Name = "Podciąganie nad chwyt"
                        },
                        new
                        {
                            ExerciseId = "b",
                            CategoryId = "1",
                            Description = "Nasze mięśnie czworogłowe dają z siebie wszystko już na samym dole przysiadu, jako że przy siadach high bar ciężar jest mniejszy, kolana mogą wysunąć się trochę bardziej do przodu, bo moment siły potrzebny do wyprostowania kolana jest taki sam, jak przy siadzie low bar z cięższą sztangą.",
                            Name = "Przysiady ze sztangą (high bar)"
                        },
                        new
                        {
                            ExerciseId = "c",
                            CategoryId = "1",
                            Description = "Hip thrust, czyli wypychanie bioder w podporze grzbietem o ławeczkę oraz glute bridge, czyli unoszenie bioder w pozycji leżącej to aktualnie jedne z najskuteczniejszych ćwiczeń na mięśnie pośladkowe!",
                            Name = "Glut bridge jednorożec"
                        },
                        new
                        {
                            ExerciseId = "d",
                            CategoryId = "1",
                            Description = "Utrzymuj prawidłową pozycję wyjściową, napinaj mocno mięśnie nóg, pośladki oraz brzuch, utrzymaj pozycję przez wyznaczony czas, wykonaj izometryczny skurcz mięśni oraz oddychaj głęboko.",
                            Name = "Deska bokiem"
                        },
                        new
                        {
                            ExerciseId = "e",
                            CategoryId = "1",
                            Description = "Dziękuję bardzo za odpowiedź! czy mogę wykonywać wznosy bokiem hantlami bo chce zacząć chodzić na siłownie,mialem przerwę i chce znowu zacząć chodzić. Czy jakoś te wznosy mogą przyhamowac wzrost czy coś i czy mogę je wykonywać?",
                            Name = "Spiętki"
                        },
                        new
                        {
                            ExerciseId = "f",
                            CategoryId = "2",
                            Description = "Spacer farmera (ang. Farmer's Walk) – konkurencja zawodów siłaczy. Zadaniem zawodnika jest podniesienie z podłoża dwóch ciężarów (tzw. „walizek”) – po jednym w każdej z dłoni – i pokonaniu z obydwoma dystansu.",
                            Name = "Spacer farmera"
                        },
                        new
                        {
                            ExerciseId = "g",
                            CategoryId = "2",
                            Description = "",
                            Name = "Martwy ciąg sumo"
                        },
                        new
                        {
                            ExerciseId = "h",
                            CategoryId = "2",
                            Description = "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.",
                            Name = "Martwy Ciąg"
                        },
                        new
                        {
                            ExerciseId = "i",
                            CategoryId = "2",
                            Description = "W pozycji górnej ćwiczenia napnij łydki.Powoli opuść się z powrotem do pozycji wyjściowej, abyś czuł pełne rozciąganie w łydkach.Nie uginaj kolan, by wytworzyć pęd podczas unoszenia się na palcach stóp.",
                            Name = "Uginanie na łydki stojąc"
                        },
                        new
                        {
                            ExerciseId = "j",
                            CategoryId = "3",
                            Description = "1) Połóż się na ławce płaskiej. 2) Stopy ustaw w lekkim rozkroku i mocno zaprzyj o podłoże. 3) Chwyć sztangę nachwytem (palce wskazują przód, kciuki skierowane do środka) na taką szerokość, aby w połowie wykonywania ruchu kąt między ramieniem a przedramieniem wynosił 90 stopni.",
                            Name = "Wyciskanie na płaskiej"
                        },
                        new
                        {
                            ExerciseId = "k",
                            CategoryId = "3",
                            Description = "Wznosy bokiem, wznosy sztangielek bokiem, lub odwodzenie ramion w bok ze sztangielkami (ang. Shoulder Fly, dumbbell deltoid raise) - ćwiczenie fizyczne polegające na podnoszeniu ramionami ciężaru (najczęściej hantli) stosowane podczas treningu kulturystycznego.",
                            Name = "Wznosy bokiem"
                        },
                        new
                        {
                            ExerciseId = "l",
                            CategoryId = "3",
                            Description = "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.",
                            Name = "Martwy ciąg sumo"
                        },
                        new
                        {
                            ExerciseId = "m",
                            CategoryId = "3",
                            Description = "1) Zajmij miejsce na maszynie, dostosowując ją do swojego wzrostu.Kończyny dolne wyprostowane, wałek maszyny znajduje się kilka centymetrów poniżej łydek.Chwyć za uchwyty znajdujące się po bokach siedziska.",
                            Name = "Uginanie na dwójki na maszynie"
                        },
                        new
                        {
                            ExerciseId = "n",
                            CategoryId = "3",
                            Description = " Z pozycji, w której stopa jest mocno zadarta do góry, pięta skrajnie obniżona, palce wskazują sufit, a łydka jest mocno rozciągnięta, odpychaj się od podwyższenia poprzez mocne wspięcie na palce i napięcie łydek.",
                            Name = "Uginanie na łydki stojąc"
                        },
                        new
                        {
                            ExerciseId = "o",
                            CategoryId = "3",
                            Description = "musculus triceps brachii) - mięsień zajmujący całą powierzchnię tylną ramienia i należący do tylnej grupy mięśni ramienia, rozpięty między łopatką i kością",
                            Name = "Triceps"
                        });
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Plan", b =>
                {
                    b.Property<string>("PlanId")
                        .HasColumnType("text")
                        .HasColumnName("plan_id");

                    b.Property<string>("CreatorId")
                        .HasColumnType("text")
                        .HasColumnName("creator_id");

                    b.Property<string>("CreatorName")
                        .HasColumnType("text")
                        .HasColumnName("creator_name");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("text")
                        .HasColumnName("organization_id");

                    b.Property<string>("Title")
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("PlanId");

                    b.HasIndex("OrganizationId");

                    b.ToTable("plans");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Serie", b =>
                {
                    b.Property<string>("SerieId")
                        .HasColumnType("text")
                        .HasColumnName("serie_id");

                    b.Property<string>("ExerciseId")
                        .HasColumnType("text")
                        .HasColumnName("exercise_id");

                    b.Property<int>("Repeats")
                        .HasColumnType("integer")
                        .HasColumnName("repeats");

                    b.Property<int>("Times")
                        .HasColumnType("integer")
                        .HasColumnName("times");

                    b.Property<int>("Weight")
                        .HasColumnType("integer")
                        .HasColumnName("weight");

                    b.HasKey("SerieId");

                    b.HasIndex("ExerciseId");

                    b.ToTable("series");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Users.User", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text")
                        .HasColumnName("user_id");

                    b.Property<byte[]>("Avatar")
                        .HasColumnType("bytea")
                        .HasColumnName("avatar");

                    b.Property<string>("Email")
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .HasColumnType("text")
                        .HasColumnName("first_name");

                    b.Property<bool>("IsActivated")
                        .HasColumnType("boolean")
                        .HasColumnName("is_activated");

                    b.Property<string>("LastName")
                        .HasColumnType("text")
                        .HasColumnName("last_name");

                    b.Property<string>("OrganizationId")
                        .HasColumnType("text")
                        .HasColumnName("organization_id");

                    b.Property<string>("Password")
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea")
                        .HasColumnName("password_hash");

                    b.Property<DateTime>("PasswordReset")
                        .HasColumnType("date")
                        .HasColumnName("password_reset");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("bytea")
                        .HasColumnName("password_salt");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text")
                        .HasColumnName("phone_number");

                    b.Property<string>("ResetToken")
                        .HasColumnType("text")
                        .HasColumnName("reset_token");

                    b.Property<DateTime?>("ResetTokenExpires")
                        .HasColumnType("date")
                        .HasColumnName("reset_token_expires");

                    b.Property<string>("RoleId")
                        .HasColumnType("text")
                        .HasColumnName("role_id");

                    b.Property<string>("Token")
                        .HasColumnType("text")
                        .HasColumnName("token");

                    b.Property<string>("VerificationToken")
                        .HasColumnType("text")
                        .HasColumnName("verification_token");

                    b.HasKey("UserId");

                    b.HasIndex("OrganizationId");

                    b.HasIndex("RoleId");

                    b.ToTable("users");

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

            modelBuilder.Entity("PlanfiApi.Data.ViewModels.UsersTrainers", b =>
                {
                    b.Property<string>("ClientId")
                        .HasColumnType("text")
                        .HasColumnName("client_id");

                    b.Property<string>("TrainerId")
                        .HasColumnType("text")
                        .HasColumnName("trainer_id");

                    b.HasKey("ClientId", "TrainerId");

                    b.HasIndex("TrainerId");

                    b.ToTable("userstrainers");
                });

            modelBuilder.Entity("PlanfiApi.Models.ChatRoom", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("chatrooms");
                });

            modelBuilder.Entity("PlanfiApi.Models.Message", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Contents")
                        .HasColumnType("text")
                        .HasColumnName("contents");

                    b.Property<DateTime>("PostedAt")
                        .HasColumnType("date")
                        .HasColumnName("posted_at");

                    b.Property<Guid>("RoomId")
                        .HasColumnType("uuid")
                        .HasColumnName("room_id");

                    b.Property<string>("UserName")
                        .HasColumnType("text")
                        .HasColumnName("user_name");

                    b.HasKey("Id");

                    b.ToTable("messages");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Users.Role", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id");

                    b.ToTable("role");

                    b.HasData(
                        new
                        {
                            Id = "1",
                            Name = "Trainer"
                        },
                        new
                        {
                            Id = "2",
                            Name = "User"
                        },
                        new
                        {
                            Id = "3",
                            Name = "Owner"
                        });
                });

            modelBuilder.Entity("WebApi.Data.Entities.UsersPlans", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text")
                        .HasColumnName("user_id");

                    b.Property<string>("PlanId")
                        .HasColumnType("text")
                        .HasColumnName("plan_id");

                    b.HasKey("UserId", "PlanId");

                    b.HasIndex("PlanId");

                    b.ToTable("usersplans");
                });

            modelBuilder.Entity("WebApi.Entities.Organization", b =>
                {
                    b.Property<string>("OrganizationId")
                        .HasColumnType("text")
                        .HasColumnName("organization_id");

                    b.Property<string>("Name")
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("OrganizationId");

                    b.ToTable("organizations");

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

            modelBuilder.Entity("PlanfiApi.Data.Entities.Category", b =>
                {
                    b.HasOne("WebApi.Entities.Organization", null)
                        .WithMany("Categories")
                        .HasForeignKey("OrganizationId");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Exercise", b =>
                {
                    b.HasOne("PlanfiApi.Data.Entities.Category", null)
                        .WithMany("Exercises")
                        .HasForeignKey("CategoryId");

                    b.HasOne("PlanfiApi.Data.Entities.Plan", null)
                        .WithMany("Exercises")
                        .HasForeignKey("PlanId");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Plan", b =>
                {
                    b.HasOne("WebApi.Entities.Organization", null)
                        .WithMany("Plans")
                        .HasForeignKey("OrganizationId");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Serie", b =>
                {
                    b.HasOne("PlanfiApi.Data.Entities.Exercise", null)
                        .WithMany("Series")
                        .HasForeignKey("ExerciseId");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Users.User", b =>
                {
                    b.HasOne("WebApi.Entities.Organization", null)
                        .WithMany("Users")
                        .HasForeignKey("OrganizationId");

                    b.HasOne("WebApi.Data.Entities.Users.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("PlanfiApi.Data.ViewModels.UsersTrainers", b =>
                {
                    b.HasOne("PlanfiApi.Data.Entities.Users.User", "Client")
                        .WithMany("UsersTrainers")
                        .HasForeignKey("ClientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PlanfiApi.Data.Entities.Users.User", "Trainer")
                        .WithMany()
                        .HasForeignKey("TrainerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Client");

                    b.Navigation("Trainer");
                });

            modelBuilder.Entity("WebApi.Data.Entities.UsersPlans", b =>
                {
                    b.HasOne("PlanfiApi.Data.Entities.Plan", "Plan")
                        .WithMany("Users")
                        .HasForeignKey("PlanId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("PlanfiApi.Data.Entities.Users.User", "User")
                        .WithMany("Plans")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Plan");

                    b.Navigation("User");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Category", b =>
                {
                    b.Navigation("Exercises");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Exercise", b =>
                {
                    b.Navigation("Series");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Plan", b =>
                {
                    b.Navigation("Exercises");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("PlanfiApi.Data.Entities.Users.User", b =>
                {
                    b.Navigation("Plans");

                    b.Navigation("UsersTrainers");
                });

            modelBuilder.Entity("WebApi.Data.Entities.Users.Role", b =>
                {
                    b.Navigation("Users");
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
