using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebApi.Entities;

namespace WebApi.Helpers
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Username=admin;Database=postgres;");
            //optionsBuilder.UseNpgsql("Host=fitdb.clbfkbqft4wd.eu-west-1.rds.amazonaws.com;Port=5432;Username=postgres;Password=postgres;Database=fitDB;");

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Plan>()
                .HasMany(b => b.Exercises)
                .WithOne();

            modelBuilder.Entity<Category>()
                .HasMany(b => b.Exercises)
                .WithOne();




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

        //public string UserId { get; set; }
        //public byte[] Avatar { get; set; }
        //public string FirstName { get; set; }
        //public string LastName { get; set; }
        //public string Email { get; set; }
        //public int PhoneNumber { get; set; }
        //public string Password { get; set; }
        //public byte[] PasswordHash { get; set; }
        //public byte[] PasswordSalt { get; set; }
        //public string Role { get; set; }
        //public string Token { get; set; }

        modelBuilder.Entity<User>().HasData(
                new User
                {
                    UserId = "u1",
                    Avatar = null,
                    FirstName = "Teodoor",
                    LastName = "Gianelli",
                    Email = "tgianelli0@eventbrite.com",
                    PhoneNumber =  555555555,
                    Password = "Teodor",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = Role.User,
                    Token = "t-user",
                },
                new User
                {
                    UserId = "u2",
                    Avatar = null,
                    FirstName = "Jillana",
                    LastName = "Casson",
                    Email = "jcasson3@prlog.org",
                    PhoneNumber = 666666666,
                    Password = "Jillana",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = Role.Trainer,
                    Token = "t-trainer",
                },
                new User
                {
                    UserId = "u3",
                    Avatar = null,
                    FirstName = "Kimmi",
                    LastName = "Sarll",
                    Email = "ksarllr@disqus.com",
                    PhoneNumber = 777777777,
                    Password = "Kimmi",
                    PasswordHash = null,
                    PasswordSalt = null,
                    Role = Role.Organization,
                    Token = "t-organization",
                }
            );

        }


        public DbSet<User> Users { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
    }
}