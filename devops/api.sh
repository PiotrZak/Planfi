MIGRATION_DIRECTORY="Migrations"

cd server

if [ -d "$MIGRATION_DIRECTORY" ]; then
 rm -r $MIGRATION_DIRECTORY/* 
fi

sudo -u postgres -H -- psql -d planfi -c "drop schema public cascade;"
sudo -u postgres -H -- psql -d planfi -c "CREATE SCHEMA public;"

/root/.dotnet/tools/./dotnet-ef migrations add InitialCreate
/root/.dotnet/tools/./dotnet-ef database update
dotnet run
