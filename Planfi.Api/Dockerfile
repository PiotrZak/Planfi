FROM mcr.microsoft.com/dotnet/sdk:5.0

COPY . /app
WORKDIR /app
FROM mcr.microsoft.com/dotnet/sdk:5.0.102-ca-patch-buster-slim AS build

RUN dotnet tool install --global dotnet-ef

COPY ["/Planfi.Api/.", "./Planfi.Api/"]

# too heavy - 576 mb

#RUN dotnet restore "Planfi.Api/WebApi.csproj"
RUN dotnet build "Planfi.Api/WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Planfi.Api/WebApi.csproj" -c Release -o /app/publish

RUN chmod +x Planfi.Api/dbMigration.sh
CMD /bin/bash Planfi.Api/dbMigration.sh

# COPY --from=publish /app/publish . *host.json ./
# ENTRYPOINT ["dotnet", "WebApi.dll"]
