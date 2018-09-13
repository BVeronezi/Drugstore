using System.Xml.Serialization;

namespace Drugstore.Dominio.Entidades.Pagamento
{
    public class ReceiverPagSeguro
    {
        [XmlElement(ElementName = "email")]
        public string Email { get { return "drugstore@drugstore.com"; } set { } }
    }
}