FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /app

COPY ["/Planfi.Api/.", "./Planfi.Api/"]
RUN dotnet restore "Planfi.Api/PlanfiApi.csproj"

FROM build AS publish
RUN dotnet publish "Planfi.Api/PlanfiApi.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "/app/PlanfiApi.dll" ]