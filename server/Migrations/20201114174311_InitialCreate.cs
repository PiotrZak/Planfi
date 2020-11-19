using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    OrganizationId = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.OrganizationId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    OrganizationId = table.Column<string>(nullable: true),
                    Avatar = table.Column<byte[]>(nullable: true),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<int>(nullable: false),
                    Password = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    Token = table.Column<string>(nullable: true),
                    ResetToken = table.Column<string>(nullable: true),
                    ResetTokenExpires = table.Column<DateTime>(nullable: true),
                    PasswordReset = table.Column<DateTime>(nullable: false),
                    VerificationToken = table.Column<string>(nullable: true),
                    IsActivated = table.Column<bool>(nullable: false),
                    Discriminator = table.Column<string>(nullable: false),
                    AdminId = table.Column<string>(nullable: true),
                    ClientId = table.Column<string>(nullable: true),
                    OwnerId = table.Column<string>(nullable: true),
                    TrainerId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClientsTrainers",
                columns: table => new
                {
                    TrainerId = table.Column<string>(nullable: false),
                    ClientId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsTrainers", x => new { x.ClientId, x.TrainerId });
                    table.ForeignKey(
                        name: "FK_ClientsTrainers_Users_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientsTrainers_Users_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    PlanId = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    CreatorId = table.Column<string>(nullable: true),
                    CreatorName = table.Column<string>(nullable: true),
                    OrganizationId = table.Column<string>(nullable: true),
                    ClientUserId = table.Column<string>(nullable: true),
                    TrainerUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.PlanId);
                    table.ForeignKey(
                        name: "FK_Plans_Users_ClientUserId",
                        column: x => x.ClientUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Plans_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Plans_Users_TrainerUserId",
                        column: x => x.TrainerUserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ClientsPlans",
                columns: table => new
                {
                    ClientId = table.Column<string>(nullable: false),
                    PlanId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientsPlans", x => new { x.ClientId, x.PlanId });
                    table.ForeignKey(
                        name: "FK_ClientsPlans_Users_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientsPlans_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "PlanId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    ExerciseId = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Times = table.Column<int>(nullable: false),
                    Series = table.Column<int>(nullable: false),
                    Weight = table.Column<int>(nullable: false),
                    Files = table.Column<List<byte[]>>(nullable: true),
                    CategoryId = table.Column<string>(nullable: true),
                    PlanId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exercises", x => x.ExerciseId);
                    table.ForeignKey(
                        name: "FK_Exercises_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exercises_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "PlanId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Title" },
                values: new object[,]
                {
                    { "1", "Amatorskie" },
                    { "2", "Średnio-Zaawansowane" },
                    { "3", "Profesjonalistyczne" }
                });

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "OrganizationId", "Name" },
                values: new object[,]
                {
                    { "O1", "Apple" },
                    { "O2", "Google" },
                    { "O3", "Microsoft" }
                });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "ExerciseId", "CategoryId", "Description", "Files", "Name", "PlanId", "Series", "Times", "Weight" },
                values: new object[,]
                {
                    { "a", "1", "W podciąganiu na drążku podchwytem, sam chwyt nie różni się od tego w innych ćwiczeniach wielostawowych z obciążeniem. Podchwyt to oczywiście ustawienie rąk w supinacji, czyli wewnętrzną częścią dłoni w naszą stronę. Drążek chwytamy jak najmocniej i oplatając go kciukiem.", null, "Podciąganie nad chwyt", null, 7, 4, 0 },
                    { "o", "3", "musculus triceps brachii) - mięsień zajmujący całą powierzchnię tylną ramienia i należący do tylnej grupy mięśni ramienia, rozpięty między łopatką i kością", null, "Triceps", null, 5, 1, 7 },
                    { "m", "3", "1) Zajmij miejsce na maszynie, dostosowując ją do swojego wzrostu.Kończyny dolne wyprostowane, wałek maszyny znajduje się kilka centymetrów poniżej łydek.Chwyć za uchwyty znajdujące się po bokach siedziska.", null, "Uginanie na dwójki na maszynie", null, 0, 0, 43 },
                    { "l", "3", "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.", null, "Martwy ciąg sumo", null, 0, 0, 35 },
                    { "k", "3", "Wznosy bokiem, wznosy sztangielek bokiem, lub odwodzenie ramion w bok ze sztangielkami (ang. Shoulder Fly, dumbbell deltoid raise) - ćwiczenie fizyczne polegające na podnoszeniu ramionami ciężaru (najczęściej hantli) stosowane podczas treningu kulturystycznego.", null, "Wznosy bokiem", null, 3, 5, 25 },
                    { "j", "3", "1) Połóż się na ławce płaskiej. 2) Stopy ustaw w lekkim rozkroku i mocno zaprzyj o podłoże. 3) Chwyć sztangę nachwytem (palce wskazują przód, kciuki skierowane do środka) na taką szerokość, aby w połowie wykonywania ruchu kąt między ramieniem a przedramieniem wynosił 90 stopni.", null, "Wyciskanie na płaskiej", null, 2, 5, 60 },
                    { "i", "2", "W pozycji górnej ćwiczenia napnij łydki.Powoli opuść się z powrotem do pozycji wyjściowej, abyś czuł pełne rozciąganie w łydkach.Nie uginaj kolan, by wytworzyć pęd podczas unoszenia się na palcach stóp.", null, "Uginanie na łydki stojąc", null, 27, 2, 35 },
                    { "n", "3", " Z pozycji, w której stopa jest mocno zadarta do góry, pięta skrajnie obniżona, palce wskazują sufit, a łydka jest mocno rozciągnięta, odpychaj się od podwyższenia poprzez mocne wspięcie na palce i napięcie łydek.", null, "Uginanie na łydki stojąc", null, 27, 2, 35 },
                    { "g", "2", "", null, "Martwy ciąg sumo", null, 0, 0, 35 },
                    { "f", "2", "Spacer farmera (ang. Farmer's Walk) – konkurencja zawodów siłaczy. Zadaniem zawodnika jest podniesienie z podłoża dwóch ciężarów (tzw. „walizek”) – po jednym w każdej z dłoni – i pokonaniu z obydwoma dystansu.", null, "Spacer farmera", null, 0, 0, 25 },
                    { "e", "1", "Dziękuję bardzo za odpowiedź! czy mogę wykonywać wznosy bokiem hantlami bo chce zacząć chodzić na siłownie,mialem przerwę i chce znowu zacząć chodzić. Czy jakoś te wznosy mogą przyhamowac wzrost czy coś i czy mogę je wykonywać?", null, "Spiętki", null, 7, 4, 0 },
                    { "d", "1", "Utrzymuj prawidłową pozycję wyjściową, napinaj mocno mięśnie nóg, pośladki oraz brzuch, utrzymaj pozycję przez wyznaczony czas, wykonaj izometryczny skurcz mięśni oraz oddychaj głęboko.", null, "Deska bokiem", null, 27, 2, 0 },
                    { "c", "1", "Hip thrust, czyli wypychanie bioder w podporze grzbietem o ławeczkę oraz glute bridge, czyli unoszenie bioder w pozycji leżącej to aktualnie jedne z najskuteczniejszych ćwiczeń na mięśnie pośladkowe!", null, "Glut bridge jednorożec", null, 9, 3, 15 },
                    { "b", "1", "Nasze mięśnie czworogłowe dają z siebie wszystko już na samym dole przysiadu, jako że przy siadach high bar ciężar jest mniejszy, kolana mogą wysunąć się trochę bardziej do przodu, bo moment siły potrzebny do wyprostowania kolana jest taki sam, jak przy siadzie low bar z cięższą sztangą.", null, "Przysiady ze sztangą (high bar)", null, 7, 4, 45 },
                    { "h", "2", "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.", null, "Martwy Ciąg", null, 0, 0, 43 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "ClientId" },
                values: new object[] { "o2u6", null, "Client", "gpedlingham6@ow.ly", "Gerald", false, "Pedlingham", "O2", "Bondy", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 666666666, null, null, "User", "t-trainer", null, "o2u6" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "OwnerId" },
                values: new object[] { "owner2", null, "Owner", "owner2@eventbrite.com", "Owner2", false, "lol", "O2", "Owner2", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "Owner", null, null, "d9ba502c-d320-4867-9b9f-162fbf00c33f" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "TrainerId" },
                values: new object[,]
                {
                    { "o2t1", null, "Trainer", "tbullerwell1n@sitemeter.com", "Talia", false, "Bullerwell", "O2", "Talia", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "Trainer", "t-organization", null, "o2t1" },
                    { "o2t2", null, "Trainer", "mbabb1x@java.com", "Malachi", false, "Babb", "O2", "Malachi", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "Trainer", "t-organization", null, "o2t2" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "ClientId" },
                values: new object[,]
                {
                    { "o3u1", null, "Client", "thilldrupe@berkeley.edu", "Titus", false, "Hilldrup", "O3", "Titus", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "o3u1" },
                    { "o3u5", null, "Client", "gcamidgej@umich.edu", "Godfry", false, "Camidge", "O3", "Godfry", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "o3u5" },
                    { "o3u3", null, "Client", "tknowldenh@wsj.com", "Trumann", false, "Knowlden", "O3", "Trumann", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "o3u3" },
                    { "o3u4", null, "Client", "jsarrell3@whitehouse.gov", "Jarret", false, "Sarrell", "O3", "Jarret", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "User", "t-trainer", null, "o2u4" },
                    { "o3u6", null, "Client", "mcorbyl@comsenz.com", "Maison", false, "Corby", "O3", "Bondy", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 666666666, null, null, "User", "t-trainer", null, "o3u6" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "OwnerId" },
                values: new object[] { "owner3", null, "Owner", "owner3@eventbrite.com", "Owner3", false, "lol", "O3", "Owner3", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "Owner", null, null, "36e72d89-31a2-4d6b-b695-fd49c972edac" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "ClientId" },
                values: new object[,]
                {
                    { "o2u5", null, "Client", "flydiate5@biblegateway.com", "Felice", false, "Lydiate", "O2", "Augustus", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "o2u5" },
                    { "o3u2", null, "Client", "mtamesf@netvibes.com", "Maribel", false, "Tames", "O3", "Maribel", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 666666666, null, null, "User", "t-trainer", null, "o3u2" },
                    { "o2u4", null, "Client", "jsarrell3@whitehouse.gov", "Jarret", false, "Sarrell", "O2", "Kiel", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "User", "t-trainer", null, "o2u4" },
                    { "u6", null, "Client", "bcaullieres@auda.org.au", "Bondy", false, "Caulliere", "O1", "Bondy", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 666666666, null, null, "User", "t-trainer", null, "u6" },
                    { "o2u2", null, "Client", "gkryska1@about.com", "Georgie", false, "Kryska", "O2", "Jillana", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 666666666, null, null, "User", "t-trainer", null, "o2u2" },
                    { "o2u1", null, "Client", "jmeachem0@eventbrite.com", "Jacklyn", false, "Meachem", "O2", "Jacklyn", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "o2u1" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "TrainerId" },
                values: new object[,]
                {
                    { "t2", null, "Trainer", "efearey1f@mlb.com", "Eadith", false, "Fearey", "O1", "Eadith", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "Trainer", "t-organization", null, "t2" },
                    { "t1", null, "Trainer", "vmaccathay17@house.gov", "Valentia", false, "MacCathay", "O1", "Valentia", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "Trainer", "t-organization", null, "t1" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "OwnerId" },
                values: new object[] { "owner1", null, "Owner", "owner1@eventbrite.com", "Owner1", false, "LastName", "O1", "Owner1", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "Owner", null, null, "e3b7c0ad-caa5-47a3-ad9f-e2d2f143dccd" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "TrainerId" },
                values: new object[] { "o3t1", null, "Trainer", "bdunstan8@dell.com", "Benedikta", false, "Dunstan", "O3", "Valentia", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "Trainer", "t-organization", null, "o3t1" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "ClientId" },
                values: new object[,]
                {
                    { "u5", null, "Client", "awharinu@tmall.com", "Augustus", false, "Wharin", "O1", "Augustus", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "u5" },
                    { "u4", null, "Client", "kburgne2@hp.com", "Kiel", false, "Burgne", "O1", "Kiel", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "User", "t-trainer", null, "u4" },
                    { "u3", null, "Client", "Teloinic@gmail.com", "Camille", false, "Teloinic", "O1", "Teodor", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "u3" },
                    { "u2", null, "Client", "jcasson3@prlog.org", "Jillana", false, "Casson", "O1", "Jillana", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 666666666, null, null, "User", "t-trainer", null, "u2" },
                    { "u1", null, "Client", "tgianelli0@eventbrite.com", "Teodoor", false, "Gianelli", "O1", "Teodor", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "u1" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "AdminId" },
                values: new object[] { "a1", null, "Admin", "tgianelli0@eventbrite.com", "admin", false, "lol", "O1", "admin", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "Admin", null, null, "40b20ee7-4da3-4fb3-a847-8e3851a434e2" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "ClientId" },
                values: new object[] { "o2u3", null, "Client", "kcridge2@xrea.com", "Kiah", false, "Cridge", "O2", "Teodor", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 555555555, null, null, "User", "t-user", null, "o2u3" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Discriminator", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "Role", "Token", "VerificationToken", "TrainerId" },
                values: new object[] { "o3t2", null, "Trainer", "fhobdena@census.gov", "Freddie", false, "Hobden", "O3", "Eadith", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, 777777777, null, null, "Trainer", "t-organization", null, "o3t2" });

            migrationBuilder.CreateIndex(
                name: "IX_ClientsPlans_PlanId",
                table: "ClientsPlans",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientsTrainers_TrainerId",
                table: "ClientsTrainers",
                column: "TrainerId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_CategoryId",
                table: "Exercises",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_PlanId",
                table: "Exercises",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_ClientUserId",
                table: "Plans",
                column: "ClientUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_OrganizationId",
                table: "Plans",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_TrainerUserId",
                table: "Plans",
                column: "TrainerUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_OrganizationId",
                table: "Users",
                column: "OrganizationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientsPlans");

            migrationBuilder.DropTable(
                name: "ClientsTrainers");

            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Organizations");
        }
    }
}
