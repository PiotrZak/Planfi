FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /app

COPY ["/Planfi.Api/.", "./Planfi.Api/"]
RUN dotnet restore "Planfi.Api/PlanfiApi.csproj"
RUN dotnet publish "Planfi.Api/PlanfiApi.csproj" -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as final
ENV ASPNETCORE_URLS=http://*:${PORT}
WORKDIR /app
COPY --from=build /app/publish /app

ENTRYPOINT [ "dotnet", "/app/PlanfiApi.dll" ]