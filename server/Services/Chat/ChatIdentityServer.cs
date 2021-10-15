using System.Collections.Generic;
using System.Security.Claims;
using IdentityServer4;
using IdentityServer4.Models;
using IdentityServer4.Test;

namespace WebApi.Services.Chat
{
    public class ChatIdentityServer
    {
        public static IEnumerable<Client> GetClients()
            {
                return new List<Client>
                {
                    new Client
                    {
                        ClientId = "reactchat",
                        ClientName = "React Chat Demo",

                        AllowedGrantTypes = GrantTypes.Implicit,
                    
                        RedirectUris = { "http://localhost:5001/signin-oidc" },
                        PostLogoutRedirectUris = { "http://localhost:5001/signout-callback-oidc" },

                        AllowedScopes =
                        {
                            IdentityServerConstants.StandardScopes.OpenId,
                            IdentityServerConstants.StandardScopes.Profile
                        }
                    }
                };
            }

            internal static List<TestUser> GetUsers()
            {
                return new List<TestUser> {
                    new TestUser
                    {
                        SubjectId = "1",
                        Username = "juergen@gutsch-online.de",
                        Claims = new []{ new Claim("name", "Juergen Gutsch") },
                        Password ="Hello01!"
                    }
                };
            }
    
            public static IEnumerable<ApiResource> GetApiResources()
            {
                return new List<ApiResource>
                {
                    new ApiResource("ChatDemo", "ChatDemo")
                };
            }

            public static IEnumerable<IdentityResource> GetIdentityResources()
            {
                return new List<IdentityResource>
                {
                    new IdentityResources.OpenId(),
                    new IdentityResources.Profile(),
                };
            }
        
    }
}