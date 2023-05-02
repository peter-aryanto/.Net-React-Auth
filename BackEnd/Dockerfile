##FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS base
WORKDIR /app
#EXPOSE 5003

#ENV ASPNETCORE_URLS=https://+:5003
ENV ASPNETCORE_URLS="https://+"
ENV ASPNETCORE_HTTPS_PORT=5003
ENV ASPNETCORE_ENVIRONMENT=Development

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-dotnet-configure-containers
RUN adduser -u 5678 --disabled-password --gecos "" appuser && chown -R appuser /app
USER appuser

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["BackEnd.csproj", "./"]
RUN dotnet restore "BackEnd.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "BackEnd.csproj" -c Release -o /app/build

FROM build AS publish
COPY ./cert/localhost.pfx .
##RUN dotnet dev-certs https --clean --import ./localhost.pfx -p localhost
##RUN dotnet dev-certs https --trust
RUN dotnet publish "BackEnd.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
##COPY --from=publish ~/.dotnet/corefx/cryptography/x509stores/my /.aspnet/https
COPY ./cert/localhost.pfx .
RUN dotnet dev-certs https --clean --import ./localhost.pfx -p localhost
ENTRYPOINT ["dotnet", "BackEnd.dll"]
