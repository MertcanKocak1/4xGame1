﻿namespace Entities.Base.Interfaces
{
    public interface IBaseEntity : IIdentityColumn
    {
        public string FirstRecordIp { get; set; }
        public DateTime? FirstRecordDate { get; set; }     
        public string LastRecordIp { get; set;}
        public DateTime? LastRecordDate { get; set;}
        public bool Deleted { get; set; }
    }
    public interface IIdentityColumn
    {
        public int Id { get; set; }
    }
}
