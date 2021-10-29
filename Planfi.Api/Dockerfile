FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0.102-ca-patch-buster-slim AS build

COPY ["/Planfi.Api/.", "./Planfi.Api/"]
RUN dotnet restore "Planfi.Api/WebApi.csproj"
RUN dotnet build "Planfi.Api/WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Planfi.Api/WebApi.csproj" -c Release -o /app/publish

FROM base AS final
ENV ASPNETCORE_URLS=http://*:${PORT}
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "WebApi.dll"]


