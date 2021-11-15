using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PlanfiApi.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "chatrooms",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_chatrooms", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "messages",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    room_id = table.Column<Guid>(type: "uuid", nullable: false),
                    contents = table.Column<string>(type: "text", nullable: false),
                    user_name = table.Column<string>(type: "text", nullable: false),
                    posted_at = table.Column<DateTime>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_messages", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "organizations",
                columns: table => new
                {
                    organization_id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_organizations", x => x.organization_id);
                });

            migrationBuilder.CreateTable(
                name: "role",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "categories",
                columns: table => new
                {
                    category_id = table.Column<string>(type: "text", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    organization_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_categories", x => x.category_id);
                    table.ForeignKey(
                        name: "FK_categories_organizations_organization_id",
                        column: x => x.organization_id,
                        principalTable: "organizations",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "plans",
                columns: table => new
                {
                    plan_id = table.Column<string>(type: "text", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    creator_id = table.Column<string>(type: "text", nullable: false),
                    creator_name = table.Column<string>(type: "text", nullable: false),
                    organization_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_plans", x => x.plan_id);
                    table.ForeignKey(
                        name: "FK_plans_organizations_organization_id",
                        column: x => x.organization_id,
                        principalTable: "organizations",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "text", nullable: false),
                    organization_id = table.Column<string>(type: "text", nullable: false),
                    avatar = table.Column<byte[]>(type: "bytea", nullable: true),
                    first_name = table.Column<string>(type: "text", nullable: false),
                    last_name = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    phone_number = table.Column<string>(type: "text", nullable: false),
                    password = table.Column<string>(type: "text", nullable: false),
                    password_hash = table.Column<byte[]>(type: "bytea", nullable: false),
                    password_salt = table.Column<byte[]>(type: "bytea", nullable: false),
                    token = table.Column<string>(type: "text", nullable: false),
                    reset_token = table.Column<string>(type: "text", nullable: true),
                    reset_token_expires = table.Column<DateTime>(type: "date", nullable: true),
                    password_reset = table.Column<DateTime>(type: "date", nullable: false),
                    verification_token = table.Column<string>(type: "text", nullable: true),
                    is_activated = table.Column<bool>(type: "boolean", nullable: false),
                    role_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_users_organizations_organization_id",
                        column: x => x.organization_id,
                        principalTable: "organizations",
                        principalColumn: "organization_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_users_role_role_id",
                        column: x => x.role_id,
                        principalTable: "role",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "exercises",
                columns: table => new
                {
                    exercise_id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    description = table.Column<string>(type: "character varying(3600000)", maxLength: 3600000, nullable: false),
                    files = table.Column<List<byte[]>>(type: "bytea[]", nullable: true),
                    category_id = table.Column<string>(type: "text", nullable: false),
                    plan_id = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_exercises", x => x.exercise_id);
                    table.ForeignKey(
                        name: "FK_exercises_categories_category_id",
                        column: x => x.category_id,
                        principalTable: "categories",
                        principalColumn: "category_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_exercises_plans_plan_id",
                        column: x => x.plan_id,
                        principalTable: "plans",
                        principalColumn: "plan_id");
                });

            migrationBuilder.CreateTable(
                name: "usersplans",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "text", nullable: false),
                    plan_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usersplans", x => new { x.user_id, x.plan_id });
                    table.ForeignKey(
                        name: "FK_usersplans_plans_plan_id",
                        column: x => x.plan_id,
                        principalTable: "plans",
                        principalColumn: "plan_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_usersplans_users_user_id",
                        column: x => x.user_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "userstrainers",
                columns: table => new
                {
                    trainer_id = table.Column<string>(type: "text", nullable: false),
                    client_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userstrainers", x => new { x.client_id, x.trainer_id });
                    table.ForeignKey(
                        name: "FK_userstrainers_users_client_id",
                        column: x => x.client_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_userstrainers_users_trainer_id",
                        column: x => x.trainer_id,
                        principalTable: "users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "series",
                columns: table => new
                {
                    serie_id = table.Column<string>(type: "text", nullable: false),
                    times = table.Column<int>(type: "integer", nullable: false),
                    weight = table.Column<int>(type: "integer", nullable: false),
                    repeats = table.Column<int>(type: "integer", nullable: false),
                    exercise_id = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_series", x => x.serie_id);
                    table.ForeignKey(
                        name: "FK_series_exercises_exercise_id",
                        column: x => x.exercise_id,
                        principalTable: "exercises",
                        principalColumn: "exercise_id");
                });

            migrationBuilder.InsertData(
                table: "organizations",
                columns: new[] { "organization_id", "name" },
                values: new object[,]
                {
                    { "O1", "Apple" },
                    { "O2", "Google" },
                    { "O3", "Microsoft" }
                });

            migrationBuilder.InsertData(
                table: "role",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { "1", "Trainer" },
                    { "2", "User" },
                    { "3", "Owner" }
                });

            migrationBuilder.InsertData(
                table: "categories",
                columns: new[] { "category_id", "organization_id", "title" },
                values: new object[,]
                {
                    { "1", "O1", "Amatorskie" },
                    { "2", "O1", "Średnio-Zaawansowane" },
                    { "3", "O1", "Profesjonalistyczne" }
                });

            migrationBuilder.InsertData(
                table: "users",
                columns: new[] { "user_id", "avatar", "email", "first_name", "is_activated", "last_name", "organization_id", "password", "password_hash", "password_reset", "password_salt", "phone_number", "reset_token", "reset_token_expires", "role_id", "token", "verification_token" },
                values: new object[,]
                {
                    { "o2u1", null, "jmeachem0@eventbrite.com", "Jacklyn", true, "Meachem", "O2", "Jacklyn", new byte[] { 0, 0 }, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new byte[] { 0, 0, 0, 0, 0 }, "555555555", null, null, "1", "t-user", null },
                    { "o3u1", null, "thilldrupe@berkeley.edu", "Titus", true, "Hilldrup", "O3", "Titus", new byte[] { 0, 0 }, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new byte[] { 0, 0, 0, 0, 0 }, "555555555", null, null, "1", "t-user", null },
                    { "u1", null, "tgianelli0@eventbrite.com", "Teodoor", true, "Gianelli", "O1", "Teodor", new byte[] { 0, 0 }, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new byte[] { 0, 0, 0, 0, 0 }, "555555555", null, null, "1", "t-user", null }
                });

            migrationBuilder.InsertData(
                table: "exercises",
                columns: new[] { "exercise_id", "category_id", "description", "files", "name", "plan_id" },
                values: new object[,]
                {
                    { "a", "1", "W podciąganiu na drążku podchwytem, sam chwyt nie różni się od tego w innych ćwiczeniach wielostawowych z obciążeniem. Podchwyt to oczywiście ustawienie rąk w supinacji, czyli wewnętrzną częścią dłoni w naszą stronę. Drążek chwytamy jak najmocniej i oplatając go kciukiem.", null, "Podciąganie nad chwyt", null },
                    { "b", "1", "Nasze mięśnie czworogłowe dają z siebie wszystko już na samym dole przysiadu, jako że przy siadach high bar ciężar jest mniejszy, kolana mogą wysunąć się trochę bardziej do przodu, bo moment siły potrzebny do wyprostowania kolana jest taki sam, jak przy siadzie low bar z cięższą sztangą.", null, "Przysiady ze sztangą (high bar)", null },
                    { "c", "1", "Hip thrust, czyli wypychanie bioder w podporze grzbietem o ławeczkę oraz glute bridge, czyli unoszenie bioder w pozycji leżącej to aktualnie jedne z najskuteczniejszych ćwiczeń na mięśnie pośladkowe!", null, "Glut bridge jednorożec", null },
                    { "d", "1", "Utrzymuj prawidłową pozycję wyjściową, napinaj mocno mięśnie nóg, pośladki oraz brzuch, utrzymaj pozycję przez wyznaczony czas, wykonaj izometryczny skurcz mięśni oraz oddychaj głęboko.", null, "Deska bokiem", null },
                    { "e", "1", "Dziękuję bardzo za odpowiedź! czy mogę wykonywać wznosy bokiem hantlami bo chce zacząć chodzić na siłownie,mialem przerwę i chce znowu zacząć chodzić. Czy jakoś te wznosy mogą przyhamowac wzrost czy coś i czy mogę je wykonywać?", null, "Spiętki", null },
                    { "f", "2", "Spacer farmera (ang. Farmer's Walk) – konkurencja zawodów siłaczy. Zadaniem zawodnika jest podniesienie z podłoża dwóch ciężarów (tzw. „walizek”) – po jednym w każdej z dłoni – i pokonaniu z obydwoma dystansu.", null, "Spacer farmera", null },
                    { "g", "2", "", null, "Martwy ciąg sumo", null },
                    { "h", "2", "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.", null, "Martwy Ciąg", null },
                    { "i", "2", "W pozycji górnej ćwiczenia napnij łydki.Powoli opuść się z powrotem do pozycji wyjściowej, abyś czuł pełne rozciąganie w łydkach.Nie uginaj kolan, by wytworzyć pęd podczas unoszenia się na palcach stóp.", null, "Uginanie na łydki stojąc", null },
                    { "j", "3", "1) Połóż się na ławce płaskiej. 2) Stopy ustaw w lekkim rozkroku i mocno zaprzyj o podłoże. 3) Chwyć sztangę nachwytem (palce wskazują przód, kciuki skierowane do środka) na taką szerokość, aby w połowie wykonywania ruchu kąt między ramieniem a przedramieniem wynosił 90 stopni.", null, "Wyciskanie na płaskiej", null },
                    { "k", "3", "Wznosy bokiem, wznosy sztangielek bokiem, lub odwodzenie ramion w bok ze sztangielkami (ang. Shoulder Fly, dumbbell deltoid raise) - ćwiczenie fizyczne polegające na podnoszeniu ramionami ciężaru (najczęściej hantli) stosowane podczas treningu kulturystycznego.", null, "Wznosy bokiem", null },
                    { "l", "3", "Najprościej można powiedzieć, że martwy ciąg klasyczny wykonujemy rozstawiając nogi na szerokość bioder, a martwy ciąg sumo robimy na nogach rozstawionych szeroko, pilnując, aby ręce znajdowały się wewnątrz ich nawisu.", null, "Martwy ciąg sumo", null },
                    { "m", "3", "1) Zajmij miejsce na maszynie, dostosowując ją do swojego wzrostu.Kończyny dolne wyprostowane, wałek maszyny znajduje się kilka centymetrów poniżej łydek.Chwyć za uchwyty znajdujące się po bokach siedziska.", null, "Uginanie na dwójki na maszynie", null },
                    { "n", "3", " Z pozycji, w której stopa jest mocno zadarta do góry, pięta skrajnie obniżona, palce wskazują sufit, a łydka jest mocno rozciągnięta, odpychaj się od podwyższenia poprzez mocne wspięcie na palce i napięcie łydek.", null, "Uginanie na łydki stojąc", null },
                    { "o", "3", "musculus triceps brachii) - mięsień zajmujący całą powierzchnię tylną ramienia i należący do tylnej grupy mięśni ramienia, rozpięty między łopatką i kością", null, "Triceps", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_categories_organization_id",
                table: "categories",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "IX_exercises_category_id",
                table: "exercises",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "IX_exercises_plan_id",
                table: "exercises",
                column: "plan_id");

            migrationBuilder.CreateIndex(
                name: "IX_plans_organization_id",
                table: "plans",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "IX_series_exercise_id",
                table: "series",
                column: "exercise_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_organization_id",
                table: "users",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_role_id",
                table: "users",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_usersplans_plan_id",
                table: "usersplans",
                column: "plan_id");

            migrationBuilder.CreateIndex(
                name: "IX_userstrainers_trainer_id",
                table: "userstrainers",
                column: "trainer_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "chatrooms");

            migrationBuilder.DropTable(
                name: "messages");

            migrationBuilder.DropTable(
                name: "series");

            migrationBuilder.DropTable(
                name: "usersplans");

            migrationBuilder.DropTable(
                name: "userstrainers");

            migrationBuilder.DropTable(
                name: "exercises");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "categories");

            migrationBuilder.DropTable(
                name: "plans");

            migrationBuilder.DropTable(
                name: "role");

            migrationBuilder.DropTable(
                name: "organizations");
        }
    }
}
