using System;

namespace WebApi.Entities
{
    public class RefreshToken
    {
        private DateTime Expires { get; set; }
        private bool IsExpired => DateTime.UtcNow >= Expires;
        private DateTime? Revoked { get; set; }
        public bool IsActive => Revoked == null && !IsExpired;
    }
}