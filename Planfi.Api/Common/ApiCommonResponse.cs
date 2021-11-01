using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace WebApi.Common
{
    
    public interface IApiCommonResponseBuilderWithStatus
    {
        IApiCommonResponseBuilderWithMessage WithFailure();
        IApiCommonResponseBuilderWithMessage WithFailure(string error);
        IApiCommonResponseBuilderWithMessage WithFailure(IEnumerable<string> errors);
        IApiCommonResponseBuilderWithMessage WithSuccess();
    }
    public class ApiCommonResponseMessage
    {
        public string Text { get; }
        public ApiCommonResponseMessageType Type { get; }

        public ApiCommonResponseMessage(string text, ApiCommonResponseMessageType type)
        {
            Text = text;
            Type = type;
        }
    }
    public enum ApiCommonResponseMessageType
    {
        Information,
        Warning,
        Error
    }
    public sealed class ApiCommonResponse
    {
        public object Data { get; internal set; }

        public bool HasErrors => Messages != null && Messages.Any(x => x.Type == ApiCommonResponseMessageType.Error);

        public bool HasWarnings => Messages != null && Messages.Any(x => x.Type == ApiCommonResponseMessageType.Warning);

        public ICollection<ApiCommonResponseMessage> Messages { get; internal set; }

        public HttpStatusCode Status { get; internal set; }

        private ApiCommonResponse()
        {
        }

        public static IApiCommonResponseBuilderWithStatus Create()
        {
            var builder = new ApiCommonResponseBuilder(new ApiCommonResponse());

            return builder;
        }
    }
}