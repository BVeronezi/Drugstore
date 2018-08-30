namespace Drugstore.Dominio.Entidades
{
    public class EmailConfiguracoes
    {
        public bool UsarSsl { get; internal set; }
        public string ServidorSmtp = "smtp-pulse.com";
        public int ServidorPorta = 465;
        public string Usuario = "drugstore";
        public bool EscreverArquivo = false;
        public string PastaArquivo = @"c:\envioemail";
        public string De = "drugstore@drugstore.com.br";
        public string Para = "pedido@drugstore.com.br";
    }
}