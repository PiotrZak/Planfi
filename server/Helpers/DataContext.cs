using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebApi.Controllers.ViewModels;
using WebApi.Data.Entities;
using WebApi.Data.Entities.Users;
using WebApi.Data.ViewModels;
using WebApi.Entities;

namespace WebApi.Helpers
{
    public class DataContext : DbContext
    {
        public IConfiguration Configuration { get; }

        public DataContext(DbContextOptions<DataContext> options, IConfiguration configuration)
            : base(options)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var sqlConnectionString = Configuration.GetConnectionString("WebApiDatabase");
            optionsBuilder.UseNpgsql(sqlConnectionString);
        }
        
        public DbSet<Organization> Organizations { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<UsersTrainers> UsersTrainers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Organization>()
                .HasMany(b => b.Users)
                .WithOne();

            modelBuilder.Entity<Organization>()
                .HasMany(b => b.Plans)
                .WithOne();
            
            // Plans <-> Users relationship
            modelBuilder.Entity<User>()
                .HasMany(b => b.Plans)
                .WithOne();
            
            // Users <-> User relationship
            modelBuilder.Entity<UsersTrainers>()
                .HasOne(b => b.Client);
            
            modelBuilder.Entity<Plan>()
                .HasMany(b => b.Exercises)
                .WithOne();

            modelBuilder.Entity<Category>()
                .HasMany(b => b.Exercises)
                .WithOne();
            
            
            modelBuilder.Entity<Organization>().HasData(
                    new Organization
                    {
                        OrganizationId = "O1",
                        Name = "Apple",
                    },
                    new Organization
                    {
                        OrganizationId = "O2",
                        Name = "Google",
                    },
                    new Organization
                    {
                        OrganizationId = "O3",
                        Name = "Microsoft",
                    }
                );

            modelBuilder.Entity<Category>().HasData(
                new Category
                {
                    CategoryId = "1",
                    Title = "Amatorskie",
                },
                new Category
                {
                    CategoryId = "2",
                    Title = "Średnio-Zaawansowane",
                },
                new Category
                {
                    CategoryId = "3",
                    Title = "Profesjonalistyczne",
                }
            );


            modelBuilder.Entity<Exercise>().HasData(
                new Exercise
                {
                    ExerciseId = "a",
                    Name = "Podciąganie nad chwyt",
                    Description = "W podciąganiu na drążku podchwytem, sam chwyt nie różni się od tego w innych ćwiczeniach wielostawowych z obciążeniem. Podchwyt to oczywiście ustawienie rąk w supinacji, czyli wewnętrzną częścią dłoni w naszą stronę. Drążek chwytamy jak najmocniej i oplatając go kciukiem.",
                    Times = 4,
                    Series = 7,
                    Weight = 0,
                    Files = null,
                    CategoryId = "1",
                },
                new Exercise
                {
                    ExerciseId = "b",
                    Name = "Przysiady ze sztangą (high bar)",
                    Description = "Nasze mięśnie czworogłowe dają z siebie wszystko już na samym dole przysiadu, jako że przy siadach high bar ciężar jest mniejszy, kolana mogą wysunąć się trochę bardziej do przodu, bo moment siły potrzebny do wyprostowania kolana jest taki sam, jak przy siadzie low bar z cięższą sztangą.",
                    Times = 4,
                    Series = 7,
                    Weight = 45,
                    Files = null,
                    CategoryId = "1",
                },
                new Exercise
                {
                    ExerciseId = "c",
                    Name = "Glut bridge jednorożec",
                    Description = "Hip thrust, czyli wypychanie bioder w podporze grzbietem o ławeczkę oraz glute bridge, czyli unoszenie bioder w pozycji leżącej to aktualnie jedne z najskuteczniejszych ćwiczeń na mięśnie pośladkowe!",
                    Times = 3,
                    Series = 9,
                    Weight = 15,
                    Files = null,
                    CategoryId = "1",
                },
                new Exercise
                {
                    ExerciseId = "d",
                    Name = "Deska bokiem",
                    Description = "Utrzymuj prawidłową pozycję wyjściową, napinaj mocno mięśnie nóg, pośladki oraz brzuch, utrzymaj pozycję przez wyznaczony czas, wykonaj izometryczny skurcz mięśni oraz oddychaj głęboko.",
                    Times = 2,
                    Series = 27,
                    Weight = 0,
                    Files = null,
                    CategoryId = "1",
                },
                new Exercise
                {
                    ExerciseId = "e",
                    Name = "Spiętki",
                    Description = "Dziękuję bardzo za odpowiedź! czy mogę wykonywać wznosy bokiem hantlami bo chce zacząć chodzić na siłownie,mialem przerwę i chce znowu zacząć chodzić. Czy jakoś te wznosy mogą przyhamowac wzrost czy coś i czy mogę je wykonywać?",
                    Times = 4,
                    Series = 7,
                    Weight = 0,
                    Files = null,
                    CategoryId = "1",
                },

                new Exercise
                 {
                    ExerciseId = "f",
                    Name = "Spacer farmera",
                    Description = "Spacer farmera (ang. Farmer's Walk) – konkurencja zawodów siłaczy. Zadaniem zawodnika jest podniesienie z podłoża dwóch ciężarów (tzw. „walizek”) – po jednym w każdej z dłoni – i pokonaniu z obydwoma dystansu.",
                    Times = 0, 
                    Series = 0,
                    Weight = 25,
                    Files = null,
                    CategoryId = "2",
                },
                new Exercise
                {
                    ExerciseId = "g",
                    Name = "Martwy ciąg sumo",
                    Description = "",
                    Times = 0,
                    Series = 0,
                    Weight = 35,
                    Files = null,
                    CategoryId = "2",
                },
                new Exercise
                {
                    ExerciseId = "h",
                    Name = "Martwy Ciąg",
                    Description = "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.",
                    Times = 0,
                    Series = 0,
                    Weight = 43,
                    Files = null,
                    CategoryId = "2",
                },
                new Exercise
                {
                    ExerciseId = "i",
                    Name = "Uginanie na łydki stojąc",
                    Description = "W pozycji górnej ćwiczenia napnij łydki.Powoli opuść się z powrotem do pozycji wyjściowej, abyś czuł pełne rozciąganie w łydkach.Nie uginaj kolan, by wytworzyć pęd podczas unoszenia się na palcach stóp.",
                    Times = 2,
                    Series = 27,
                    Weight = 35,
                    Files = null,
                    CategoryId = "2",
                },
                new Exercise
                {
                    ExerciseId = "j",
                    Name = "Wyciskanie na płaskiej",
                    Description = "1) Połóż się na ławce płaskiej. 2) Stopy ustaw w lekkim rozkroku i mocno zaprzyj o podłoże. 3) Chwyć sztangę nachwytem (palce wskazują przód, kciuki skierowane do środka) na taką szerokość, aby w połowie wykonywania ruchu kąt między ramieniem a przedramieniem wynosił 90 stopni.",
                    Times = 5,
                    Series = 2,
                    Weight = 60,
                    Files = null,
                    CategoryId = "3",
                },
                new Exercise
                {
                    ExerciseId = "k",
                    Name = "Wznosy bokiem",
                    Description = "Wznosy bokiem, wznosy sztangielek bokiem, lub odwodzenie ramion w bok ze sztangielkami (ang. Shoulder Fly, dumbbell deltoid raise) - ćwiczenie fizyczne polegające na podnoszeniu ramionami ciężaru (najczęściej hantli) stosowane podczas treningu kulturystycznego.",
                    Times = 5,
                    Series = 3,
                    Weight = 25,
                    Files = null,
                    CategoryId = "3",
                },
                new Exercise
                {
                    ExerciseId = "l",
                    Name = "Martwy ciąg sumo",
                    Description = "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.",
                    Times = 0,
                    Series = 0,
                    Weight = 35,
                    Files = null,
                    CategoryId = "3",
                },
                new Exercise
                {
                    ExerciseId = "m",
                    Name = "Uginanie na dwójki na maszynie",
                    Description = "1) Zajmij miejsce na maszynie, dostosowując ją do swojego wzrostu.Kończyny dolne wyprostowane, wałek maszyny znajduje się kilka centymetrów poniżej łydek.Chwyć za uchwyty znajdujące się po bokach siedziska.",
                    Times = 0,
                    Series = 0,
                    Weight = 43,
                    Files = null,
                    CategoryId = "3",
                },
                new Exercise
                {
                    ExerciseId = "n",
                    Name = "Uginanie na łydki stojąc",
                    Description = " Z pozycji, w której stopa jest mocno zadarta do góry, pięta skrajnie obniżona, palce wskazują sufit, a łydka jest mocno rozciągnięta, odpychaj się od podwyższenia poprzez mocne wspięcie na palce i napięcie łydek.",
                    Times = 2,
                    Series = 27,
                    Weight = 35,
                    Files = null,
                    CategoryId = "3",
                },
                new Exercise
                {
                    ExerciseId = "o",
                    Name = "Triceps",
                    Description = "musculus triceps brachii) - mięsień zajmujący całą powierzchnię tylną ramienia i należący do tylnej grupy mięśni ramienia, rozpięty między łopatką i kością",
                    Times = 1,
                    Series = 5,
                    Weight = 7,
                    Files = null,
                    CategoryId = "3",
                }
            );

            modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        OrganizationId = "O1",
                        UserId = "a1",
                        Avatar = null,
                        FirstName = "admin",
                        LastName = "lol",
                        Email = "tgianelli0@eventbrite.com",
                        PhoneNumber = "555555555",
                        Password = "admin",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        IsActivated = true,
                    }
                );

            modelBuilder.Entity<User>().HasData(
                    new User
                        {
                            OrganizationId = "O1",
                            UserId = "owner1",
                            Avatar = null,
                            FirstName = "User1",
                            LastName = "LastName",
                            Email = "owner1@eventbrite.com",
                            PhoneNumber = "555555555",
                            Password = "User1",
                            PasswordHash = null,
                            PasswordSalt = null,
                            Role = 
       new Role { Name = "Trainer" },
                            IsActivated = true,
                        }
                    );

                    modelBuilder.Entity<User>().HasData(
                        new User
                        {
                            OrganizationId = "O2",
                            UserId = "owner2",
                            Avatar = null,
                            FirstName = "User2",
                            LastName = "lol",
                            Email = "owner2@eventbrite.com",
                            PhoneNumber = "555555555",
                            Password = "User2",
                            PasswordHash = null,
                            PasswordSalt = null,
                            Role = 
       new Role { Name = "Trainer" },
                            IsActivated = true,
                        }
                    );

                    modelBuilder.Entity<User>().HasData(
                        new User
                        {
                            OrganizationId = "O3",
                            UserId = "owner3",
                            Avatar = null,
                            FirstName = "User3",
                            LastName = "lol",
                            Email = "owner3@eventbrite.com",
                            PhoneNumber = "555555555",
                            Password = "User3",
                            PasswordHash = null,
                            PasswordSalt = null,
                            Role = 
       new Role { Name = "Trainer" },
                            IsActivated = true,
                        }
                    );

            // O1

            modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        OrganizationId = "O1",
                        UserId = "u1",
                        Avatar = null,
                        FirstName = "Teodoor",
                        LastName = "Gianelli",
                        Email = "tgianelli0@eventbrite.com",
                        PhoneNumber = "555555555",
                        Password = "Teodor",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O1",
                        UserId = "u2",

                        Avatar = null,
                        FirstName = "Jillana",
                        LastName = "Casson",
                        Email = "jcasson3@prlog.org",
                        PhoneNumber = "666666666",
                        Password = "Jillana",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O1",
                        UserId = "u3",

                        Avatar = null,
                        FirstName = "Camille",
                        LastName = "Teloinic",
                        Email = "Teloinic@gmail.com",
                        PhoneNumber = "555555555",
                        Password = "Teodor",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O1",
                        UserId = "u4",

                        Avatar = null,
                        FirstName = "Kiel",
                        LastName = "Burgne",
                        Email = "kburgne2@hp.com",
                        PhoneNumber = "777777777",
                        Password = "Kiel",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O1",
                        UserId = "u5",

                        Avatar = null,
                        FirstName = "Augustus",
                        LastName = "Wharin",
                        Email = "awharinu@tmall.com",
                        PhoneNumber = "555555555",
                        Password = "Augustus",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O1",
                        UserId = "u6",

                        Avatar = null,
                        FirstName = "Bondy",
                        LastName = "Caulliere",
                        Email = "bcaullieres@auda.org.au",
                        PhoneNumber = "666666666",
                        Password = "Bondy",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    }
                    );

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    OrganizationId = "O1",
                    UserId = "t1",

                    Avatar = null,
                    FirstName = "Valentia",
                    LastName = "MacCathay",
                    Email = "vmaccathay17@house.gov",
                    PhoneNumber = "777777777",
                    Password = "Valentia",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = new Role { Name = "Trainer" },
                    Token = "t-organization",
                    IsActivated = true,
                },

                new User
                {
                    OrganizationId = "O1",
                    UserId = "t2",

                    Avatar = null,
                    FirstName = "Eadith",
                    LastName = "Fearey",
                    Email = "efearey1f@mlb.com",
                    PhoneNumber = "777777777",
                    Password = "Eadith",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = new Role { Name = "Trainer" },
                    Token = "t-organization",
                    IsActivated = true,
                }
                );

            // O2 

            modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        OrganizationId = "O2",
                        UserId = "o2u1",

                        Avatar = null,
                        FirstName = "Jacklyn",
                        LastName = "Meachem",
                        Email = "jmeachem0@eventbrite.com",
                        PhoneNumber = "555555555",
                        Password = "Jacklyn",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O2",
                        UserId = "o2u2",

                        Avatar = null,
                        FirstName = "Georgie",
                        LastName = "Kryska",
                        Email = "gkryska1@about.com",
                        PhoneNumber = "666666666",
                        Password = "Jillana",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O2",
                        UserId = "o2u3",
                        Avatar = null,
                        FirstName = "Kiah",
                        LastName = "Cridge",
                        Email = "kcridge2@xrea.com",
                        PhoneNumber = "555555555",
                        Password = "Teodor",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O2",
                        UserId = "o2u4",
                        Avatar = null,
                        FirstName = "Jarret",
                        LastName = "Sarrell",
                        Email = "jsarrell3@whitehouse.gov",
                        PhoneNumber = "777777777",
                        Password = "KielH",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O2",
                        UserId = "o2u5",
                        Avatar = null,
                        FirstName = "Felice",
                        LastName = "Lydiate",
                        Email = "flydiate5@biblegateway.com",
                        PhoneNumber = "555555555",
                        Password = "Augustus",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O2",
                        UserId = "o2u6",
                        Avatar = null,
                        FirstName = "Gerald",
                        LastName = "Pedlingham",
                        Email = "gpedlingham6@ow.ly",
                        PhoneNumber = "666666666",
                        Password = "Bondy",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    }
                    );

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    OrganizationId = "O2",
                    UserId = "o2t1",
                    Avatar = null,
                    FirstName = "Talia",
                    LastName = "Bullerwell",
                    Email = "tbullerwell1n@sitemeter.com",
                    PhoneNumber = "777777777",
                    Password = "Talia",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = new Role { Name = "Trainer" },
                    Token = "t-organization",
                    IsActivated = true,
                },

                new User
                {
                    OrganizationId = "O2",
                    UserId = "o2t2",
                    Avatar = null,
                    FirstName = "Malachi",
                    LastName = "Babb",
                    Email = "mbabb1x@java.com",
                    PhoneNumber = "777777777",
                    Password = "Malachi",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = new Role { Name = "Trainer" },
                    Token = "t-organization",
                    IsActivated = true,
                }
                );

            // O3 

            modelBuilder.Entity<User>().HasData(
                    new User
                    {
                        OrganizationId = "O3",
                        UserId = "o3u1",
                        Avatar = null,
                        FirstName = "Titus",
                        LastName = "Hilldrup",
                        Email = "thilldrupe@berkeley.edu",
                        PhoneNumber = "555555555",
                        Password = "Titus",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O3",
                        UserId = "o3u2",
                        Avatar = null,
                        FirstName = "Maribel",
                        LastName = "Tames",
                        Email = "mtamesf@netvibes.com",
                        PhoneNumber = "666666666",
                        Password = "Maribel",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O3",
                        UserId = "o3u3",
                        Avatar = null,
                        FirstName = "Trumann",
                        LastName = "Knowlden",
                        Email = "tknowldenh@wsj.com",
                        PhoneNumber = "555555555",
                        Password = "Trumann",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O3",
                        UserId = "o2u4",
                        Avatar = null,
                        FirstName = "Jarret",
                        LastName = "Sarrell",
                        Email = "jsarrell3@whitehouse.gov",
                        PhoneNumber = "777777777",
                        Password = "Jarret",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O3",
                        UserId = "o3u5",
                        Avatar = null,
                        FirstName = "Godfry",
                        LastName = "Camidge",
                        Email = "gcamidgej@umich.edu",
                        PhoneNumber = "555555555",
                        Password = "Godfry",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-user",
                        IsActivated = true,
                    },
                    new User
                    {
                        OrganizationId = "O3",
                        UserId = "o3u6",
                        Avatar = null,
                        FirstName = "Maison",
                        LastName = "Corby",
                        Email = "mcorbyl@comsenz.com",
                        PhoneNumber = "666666666",
                        Password = "Bondy",
                        PasswordHash = null,
                        PasswordSalt = null,
                        Role = 
   new Role { Name = "Trainer" },
                        Token = "t-trainer",
                        IsActivated = true,
                    }
                    );

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    OrganizationId = "O3",
                    UserId = "o3t1",
                    Avatar = null,
                    FirstName = "Benedikta",
                    LastName = "Dunstan",
                    Email = "bdunstan8@dell.com",
                    PhoneNumber = "777777777",
                    Password = "Valentia",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = new Role { Name = "Trainer" },
                    Token = "t-organization",
                    IsActivated = true,
                },

                new User
                {
                    OrganizationId = "O3",
                    UserId = "o3t2",
                    Avatar = null,
                    FirstName = "Freddie",
                    LastName = "Hobden",
                    Email = "fhobdena@census.gov",
                    PhoneNumber = "777777777",
                    Password = "Eadith",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = new Role { Name = "Trainer" },
                    Token = "t-organization",
                    IsActivated = true,
                }
                );
        }
    }
}