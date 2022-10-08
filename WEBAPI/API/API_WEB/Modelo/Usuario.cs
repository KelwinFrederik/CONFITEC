namespace API_WEB.Modelo
{
    public class Usuario
    {
        public int Id { get; set; } = 0;
        public string Nome { get; set; } = string.Empty;
        public string Sobrenome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DataNascimento { get; set; } = DateTime.MinValue;
        public int Escolaridade { get; set; } = 0;
    }
}
