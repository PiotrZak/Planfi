FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
ENV PORT 8091
ENV ASPNETCORE_URLS=http://+:8091

FROM mcr.microsoft.com/dotnet/sdk:5.0.102-ca-patch-buster-slim AS build

COPY ["/Planfi.Api/.", "./Planfi.Api/"]
RUN dotnet restore "Planfi.Api/WebApi.csproj"
RUN dotnet build "Planfi.Api/WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Planfi.Api/WebApi.csproj" -c Release -o /app/publish

FROM base as final

EXPOSE 8081
COPY --from=publish /app/publish . *host.json ./
ENTRYPOINT ["dotnet", "WebApi.dll"]


