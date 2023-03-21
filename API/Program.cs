var builder = WebApplication.CreateBuilder(args);

// ====================== Dependency Injection Container ========================

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ==============================================================================




var app = builder.Build();



// ========================== Middleware Controller =============================

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

// ==============================================================================
