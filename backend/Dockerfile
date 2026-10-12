# ---- Build ----
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY global.json NexusComunitario.sln ./
COPY src/NexusComunitario.Api/*.csproj src/NexusComunitario.Api/
COPY src/NexusComunitario.Application/*.csproj src/NexusComunitario.Application/
COPY src/NexusComunitario.Domain/*.csproj src/NexusComunitario.Domain/
COPY src/NexusComunitario.Infrastructure/*.csproj src/NexusComunitario.Infrastructure/
RUN dotnet restore src/NexusComunitario.Api/NexusComunitario.Api.csproj
COPY . .
RUN dotnet publish src/NexusComunitario.Api/NexusComunitario.Api.csproj -c Release -o /app/publish --no-restore

# ---- Runtime ----
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build --chown=$APP_UID /app/publish .
ENV ASPNETCORE_HTTP_PORTS=8080
EXPOSE 8080
USER $APP_UID
ENTRYPOINT ["dotnet", "NexusComunitario.Api.dll"]
