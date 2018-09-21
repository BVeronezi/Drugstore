using System.Xml.Serialization;

namespace Drugstore.Dominio.Entidades.Pagamento
{
    public class ItemPagSeguro
    {
        [XmlElement(ElementName = "id")]
        public string Id { get; set; }
        [XmlElement(ElementName = "description")]
        public string Description { get; set; }
        [XmlElement(ElementName = "amount")]
        public decimal Amount { get; set; }
        [XmlElement(ElementName = "quantity")]
        public int Quantity { get; set; }
        [XmlElement(ElementName = "weight")]
        public int Weight { get; set; }

        private decimal cost;
        [XmlElement(ElementName = "shippingCost")]
        public string ShippingCost
        {
            get { return cost.ToString("n2"); }
            set { cost = decimal.Parse(value); }
        }
    }
}