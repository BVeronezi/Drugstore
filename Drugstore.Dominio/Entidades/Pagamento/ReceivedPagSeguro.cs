using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Drugstore.Dominio.Entidades.Pagamento
{
    [XmlRoot("checkout")]
    public class ReceivedPagSeguro
    {
        [XmlElement(ElementName = "code")]
        public string Code { get; set; }
        [XmlElement(ElementName = "date")]
        public string Date { get; set; }
        [XmlElement(ElementName = "qrCode")]
        public string QrCode { get; set; }
    }
}
