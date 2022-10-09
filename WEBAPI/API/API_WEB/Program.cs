using Microsoft.EntityFrameworkCore;
using API_WEB.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => { options.AddPolicy("EnableCORS", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().Build();
    });
});

builder.Services.AddDbContext<DatabaseContext>(opt => opt.UseSqlServer("Server=localhost;Database=Cadastro;Trusted_Connection=True;"));
builder.Services.AddControllers();

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors("EnableCORS");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
