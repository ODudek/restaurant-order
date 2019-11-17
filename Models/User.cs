using System.ComponentModel.DataAnnotations;

namespace restaurant_order.Models {
    public class AuthenticateModel {
        public int id { get; set; }
        [Required]
        public string login { get; set; }

        [Required]
        public string password { get; set; }

        public string name { get; set; }
    }
}