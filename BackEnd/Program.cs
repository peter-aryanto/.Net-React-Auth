using BackEnd;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDatabase();

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

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
