using System.Collections.Generic;
using System.Xml.Serialization;

namespace Drugstore.Dominio.Entidades.Pagamento
{
    public class SenderPagSeguro
    {
        [XmlElement(ElementName = "name")]
        public string Name { get; set; }
        [XmlElement(ElementName = "email")]
        public string Email { get; set; }
        [XmlElement(ElementName = "phone")]
        public SenderPhonePagSeguro Phone { get; set; }
        [XmlElement(ElementName = "ip")]
        public string IP { get; set; }
        [XmlArray("documents")]
        [XmlArrayItem("document")]
        public List<SenderDocumentPagSeguro> Documents { get; set; }
    }
}