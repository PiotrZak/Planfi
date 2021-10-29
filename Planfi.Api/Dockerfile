FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
ENV PORT 8081
ENV ASPNETCORE_URLS=http://+:8081

FROM mcr.microsoft.com/dotnet/sdk:5.0.102-ca-patch-buster-slim AS build

COPY ["/Planfi.Api/.", "./Planfi.Api/"]
RUN dotnet restore "Planfi.Api/WebApi.csproj"
RUN dotnet build "Planfi.Api/WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Planfi.Api/WebApi.csproj" -c Release -o /app/publish

FROM base as final
WORKDIR /app

COPY --from=publish /app/publish . *host.json ./
ENTRYPOINT ["dotnet", "WebApi.dll"]


