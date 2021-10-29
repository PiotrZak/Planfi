FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as base
WORKDIR /app
EXPOSE 80
EXPOSE 9001

FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build
WORKDIR /src

COPY ["/Planfi.Api/.", "./Planfi.Api/"]
RUN dotnet restore "Planfi.Api/PlanfiApi.csproj"

WORKDIR "/src/Planfi.Api}"
COPY . .

RUN dotnet build "Planfi.Api/PlanfiApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Planfi.Api/PlanfiApi.csproj" -c Release -o /app/publish


FROM base AS final
ENV ASPNETCORE_URLS=http://*:${PORT}
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PlanfiApi.dll"]