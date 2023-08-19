using Entities.Base.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Base
{
   public abstract class BaseEntity : IBaseEntity
    {
        protected BaseEntity()
        {
            FirstRecordDate = DateTime.Now;
            FirstRecordIp = "127.0.0.1";
            Deleted = false;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(Order = 1)]
        public virtual int Id { get; set; }


        [Required]
        [StringLength(50, ErrorMessage = "IP address cannot exceed 50 characters.")]
        [Column(Order = 3)]
        public string FirstRecordIp { get; set; }

        [Column(Order = 4)]
        public DateTime? FirstRecordDate { get; set; }



        [StringLength(50, ErrorMessage = "IP address cannot exceed 50 characters.")]
        [Column(Order = 5)]
        public string LastRecordIp { get; set; }


        [Column(Order = 6)]
        public DateTime? LastRecordDate { get; set; }


        [Column(Order = 7)]
        public bool Deleted { get; set; }

    }
}
