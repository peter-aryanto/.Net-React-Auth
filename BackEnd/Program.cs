using BackEnd;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Identity.Web;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
JwtSecurityTokenHandler.DefaultMapInboundClaims = false;
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddMicrosoftIdentityWebApi(
    options => {
      builder.Configuration.Bind("AzureADB2C", options);
    },
    options => {
      builder.Configuration.Bind("AzureADB2C", options);
    }
  );

builder.Services.AddDatabase();
builder.Services.AddCors(options => {
  // options.AddPolicy(
  //   "AllowFrontend", // To be used in combination with [EnableCors("AllowFrontend")].
  //   policy => {
  //     policy.WithOrigins("https://localhost:5005");
  //   }
  // );
  options.AddDefaultPolicy(
    policy => {
      policy.WithOrigins("https://localhost:5005")
      .AllowAnyHeader()
      .AllowAnyMethod();
    }
  );
});

builder.Services.AddControllers()
  // .AddJsonOptions(o => {
  //   o.JsonSerializerOptions.PropertyNamingPolicy = null;
  //   o.JsonSerializerOptions.DictionaryKeyPolicy = null;
  // });
  .AddNewtonsoftJson(o => {
    o.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
    o.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
  });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(s => s.DocumentFilter<JsonPatchDocumentFilter>());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
