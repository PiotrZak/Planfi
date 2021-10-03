using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApi.Migrations
{
    public partial class InitialA : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    OrganizationId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.OrganizationId);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    OrganizationId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                    table.ForeignKey(
                        name: "FK_Categories_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Plans",
                columns: table => new
                {
                    PlanId = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    CreatorId = table.Column<string>(type: "text", nullable: true),
                    CreatorName = table.Column<string>(type: "text", nullable: true),
                    OrganizationId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Plans", x => x.PlanId);
                    table.ForeignKey(
                        name: "FK_Plans_Organizations_OrganizationId",
                        column: x => x.OrganizationId,
                        principalTable: "Organizations",
                        principalColumn: "OrganizationId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    OrganizationId = table.Column<string>(type: "text", nullable: true),
                    RoleId = table.Column<string>(type: "text", nullable: true),
                    Avatar = table.Column<byte[]>(type: "bytea", nullable: true),
                    FirstName = table.Column<string>(type: "text", nullable: true),
                    LastName = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    Password = table.Column<string>(type: "text", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "bytea", nullable: true),
                    Token = table.Column<string>(type: "text", nullable: true),
                    ResetToken = table.Column<string>(type: "text", nullable: true),
                    ResetTokenExpires = table.Column<DateTime>(type: "timestamp without time zone", nullable: true),
                    PasswordReset = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    VerificationToken = table.Column<string>(type: "text", nullable: true),
                    IsActivated = table.Column<bool>(type: "boolean", nullable: false)
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
                    table.ForeignKey(
                        name: "FK_Users_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Exercises",
                columns: table => new
                {
                    ExerciseId = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: true),
                    Description = table.Column<string>(type: "character varying(3600000)", maxLength: 3600000, nullable: true),
                    Times = table.Column<int>(type: "integer", nullable: false),
                    Series = table.Column<int>(type: "integer", nullable: false),
                    Weight = table.Column<int>(type: "integer", nullable: false),
                    Repeats = table.Column<int>(type: "integer", nullable: false),
                    Files = table.Column<List<byte[]>>(type: "bytea[]", nullable: true),
                    CategoryId = table.Column<string>(type: "text", nullable: true),
                    PlanId = table.Column<string>(type: "text", nullable: true)
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

            migrationBuilder.CreateTable(
                name: "UsersPlans",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    PlanId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersPlans", x => new { x.UserId, x.PlanId });
                    table.ForeignKey(
                        name: "FK_UsersPlans_Plans_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Plans",
                        principalColumn: "PlanId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersPlans_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UsersTrainers",
                columns: table => new
                {
                    TrainerId = table.Column<string>(type: "text", nullable: false),
                    ClientId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersTrainers", x => new { x.ClientId, x.TrainerId });
                    table.ForeignKey(
                        name: "FK_UsersTrainers_Users_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersTrainers_Users_TrainerId",
                        column: x => x.TrainerId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "OrganizationId", "Title" },
                values: new object[,]
                {
                    { "1", null, "Amatorskie" },
                    { "2", null, "Średnio-Zaawansowane" },
                    { "3", null, "Profesjonalistyczne" }
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
                table: "Role",
                columns: new[] { "Id", "Name" },
                values: new object[] { "1", "Trainer" });

            migrationBuilder.InsertData(
                table: "Exercises",
                columns: new[] { "ExerciseId", "CategoryId", "Description", "Files", "Name", "PlanId", "Repeats", "Series", "Times", "Weight" },
                values: new object[,]
                {
                    { "a", "1", "W podciąganiu na drążku podchwytem, sam chwyt nie różni się od tego w innych ćwiczeniach wielostawowych z obciążeniem. Podchwyt to oczywiście ustawienie rąk w supinacji, czyli wewnętrzną częścią dłoni w naszą stronę. Drążek chwytamy jak najmocniej i oplatając go kciukiem.", null, "Podciąganie nad chwyt", null, 0, 7, 4, 0 },
                    { "o", "3", "musculus triceps brachii) - mięsień zajmujący całą powierzchnię tylną ramienia i należący do tylnej grupy mięśni ramienia, rozpięty między łopatką i kością", null, "Triceps", null, 0, 5, 1, 7 },
                    { "n", "3", " Z pozycji, w której stopa jest mocno zadarta do góry, pięta skrajnie obniżona, palce wskazują sufit, a łydka jest mocno rozciągnięta, odpychaj się od podwyższenia poprzez mocne wspięcie na palce i napięcie łydek.", null, "Uginanie na łydki stojąc", null, 0, 27, 2, 35 },
                    { "m", "3", "1) Zajmij miejsce na maszynie, dostosowując ją do swojego wzrostu.Kończyny dolne wyprostowane, wałek maszyny znajduje się kilka centymetrów poniżej łydek.Chwyć za uchwyty znajdujące się po bokach siedziska.", null, "Uginanie na dwójki na maszynie", null, 0, 0, 0, 43 },
                    { "l", "3", "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.", null, "Martwy ciąg sumo", null, 0, 0, 0, 35 },
                    { "k", "3", "Wznosy bokiem, wznosy sztangielek bokiem, lub odwodzenie ramion w bok ze sztangielkami (ang. Shoulder Fly, dumbbell deltoid raise) - ćwiczenie fizyczne polegające na podnoszeniu ramionami ciężaru (najczęściej hantli) stosowane podczas treningu kulturystycznego.", null, "Wznosy bokiem", null, 0, 3, 5, 25 },
                    { "j", "3", "1) Połóż się na ławce płaskiej. 2) Stopy ustaw w lekkim rozkroku i mocno zaprzyj o podłoże. 3) Chwyć sztangę nachwytem (palce wskazują przód, kciuki skierowane do środka) na taką szerokość, aby w połowie wykonywania ruchu kąt między ramieniem a przedramieniem wynosił 90 stopni.", null, "Wyciskanie na płaskiej", null, 0, 2, 5, 60 },
                    { "i", "2", "W pozycji górnej ćwiczenia napnij łydki.Powoli opuść się z powrotem do pozycji wyjściowej, abyś czuł pełne rozciąganie w łydkach.Nie uginaj kolan, by wytworzyć pęd podczas unoszenia się na palcach stóp.", null, "Uginanie na łydki stojąc", null, 0, 27, 2, 35 },
                    { "g", "2", "", null, "Martwy ciąg sumo", null, 0, 0, 0, 35 },
                    { "f", "2", "Spacer farmera (ang. Farmer's Walk) – konkurencja zawodów siłaczy. Zadaniem zawodnika jest podniesienie z podłoża dwóch ciężarów (tzw. „walizek”) – po jednym w każdej z dłoni – i pokonaniu z obydwoma dystansu.", null, "Spacer farmera", null, 0, 0, 0, 25 },
                    { "e", "1", "Dziękuję bardzo za odpowiedź! czy mogę wykonywać wznosy bokiem hantlami bo chce zacząć chodzić na siłownie,mialem przerwę i chce znowu zacząć chodzić. Czy jakoś te wznosy mogą przyhamowac wzrost czy coś i czy mogę je wykonywać?", null, "Spiętki", null, 0, 7, 4, 0 },
                    { "d", "1", "Utrzymuj prawidłową pozycję wyjściową, napinaj mocno mięśnie nóg, pośladki oraz brzuch, utrzymaj pozycję przez wyznaczony czas, wykonaj izometryczny skurcz mięśni oraz oddychaj głęboko.", null, "Deska bokiem", null, 0, 27, 2, 0 },
                    { "c", "1", "Hip thrust, czyli wypychanie bioder w podporze grzbietem o ławeczkę oraz glute bridge, czyli unoszenie bioder w pozycji leżącej to aktualnie jedne z najskuteczniejszych ćwiczeń na mięśnie pośladkowe!", null, "Glut bridge jednorożec", null, 0, 9, 3, 15 },
                    { "b", "1", "Nasze mięśnie czworogłowe dają z siebie wszystko już na samym dole przysiadu, jako że przy siadach high bar ciężar jest mniejszy, kolana mogą wysunąć się trochę bardziej do przodu, bo moment siły potrzebny do wyprostowania kolana jest taki sam, jak przy siadzie low bar z cięższą sztangą.", null, "Przysiady ze sztangą (high bar)", null, 0, 7, 4, 45 },
                    { "h", "2", "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.", null, "Martwy Ciąg", null, 0, 0, 0, 43 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Avatar", "Email", "FirstName", "IsActivated", "LastName", "OrganizationId", "Password", "PasswordHash", "PasswordReset", "PasswordSalt", "PhoneNumber", "ResetToken", "ResetTokenExpires", "RoleId", "Token", "VerificationToken" },
                values: new object[,]
                {
                    { "o2u1", null, "jmeachem0@eventbrite.com", "Jacklyn", true, "Meachem", "O2", "Jacklyn", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "555555555", null, null, null, "t-user", null },
                    { "u1", null, "tgianelli0@eventbrite.com", "Teodoor", true, "Gianelli", "O1", "Teodor", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "555555555", null, null, null, "t-user", null },
                    { "o3u1", null, "thilldrupe@berkeley.edu", "Titus", true, "Hilldrup", "O3", "Titus", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "555555555", null, null, null, "t-user", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_OrganizationId",
                table: "Categories",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_CategoryId",
                table: "Exercises",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_PlanId",
                table: "Exercises",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Plans_OrganizationId",
                table: "Plans",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_OrganizationId",
                table: "Users",
                column: "OrganizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersPlans_PlanId",
                table: "UsersPlans",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersTrainers_TrainerId",
                table: "UsersTrainers",
                column: "TrainerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Exercises");

            migrationBuilder.DropTable(
                name: "UsersPlans");

            migrationBuilder.DropTable(
                name: "UsersTrainers");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Plans");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "Role");
        }
    }
}
