using System.Xml.Serialization;

namespace Drugstore.Dominio.Entidades.Pagamento
{
    public class SenderPhonePagSeguro
    {
        [XmlElement(ElementName = "areaCode")]
        public string AreaCode { get; set; }
        [XmlElement(ElementName = "number")]
        public string Number { get; set; }
    }
}