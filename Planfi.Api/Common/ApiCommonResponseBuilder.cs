using System.Collections.Generic;
using System.Net;

namespace WebApi.Common
{
    
    public interface IBuilder<TBuildingType>
    {
        TBuildingType Build();
    }
    
    public abstract class Builder<TBuildingType> : IBuilder<TBuildingType>
    {
        protected TBuildingType Target { get; set; }

        public Builder(TBuildingType target)
        {
            Target = target;
        }

        public virtual TBuildingType Build()
        {
            return Target;
        }
    }
    public class ApiCommonResponseBuilder :
        Builder<ApiCommonResponse>,
        IApiCommonResponseBuilderWithStatus,
        IApiCommonResponseBuilderWithMessage
    {
        internal ApiCommonResponseBuilder(ApiCommonResponse apiCommonResponse) : base(apiCommonResponse)
        {
        }

        public Builder<ApiCommonResponse> WithData(object data)
        {
            Target.Data = data;
            return this;
        }

        public IApiCommonResponseBuilderWithMessage WithFailure()
        {
            Target.Status = HttpStatusCode.BadRequest;
            return this;
        }

        public IApiCommonResponseBuilderWithMessage WithFailure(IEnumerable<string> errors)
        {
            WithFailure();

            if (Target.Messages == null)
            {
                Target.Messages = new List<ApiCommonResponseMessage>();
            }

            foreach (var error in errors)
            {
                Target.Messages.Add(new ApiCommonResponseMessage(error, ApiCommonResponseMessageType.Error));
            }

            return this;
        }

        public IApiCommonResponseBuilderWithMessage WithFailure(string error)
        {
            WithFailure(new List<string> {error});

            return this;
        }

        public IApiCommonResponseBuilderWithData WithMessage(ApiCommonResponseMessage message)
        {
            if (Target.Messages == null)
            {
                Target.Messages = new List<ApiCommonResponseMessage>();
            }

            Target.Messages.Add(message);

            return this;
        }

        public IApiCommonResponseBuilderWithMessage WithSuccess()
        {
            Target.Status = HttpStatusCode.OK;

            return this;
        }
    }

    public interface IApiCommonResponseBuilderWithData : IBuilder<ApiCommonResponse>
    {
        Builder<ApiCommonResponse> WithData(object data);
    }
    
    public interface IApiCommonResponseBuilderWithMessage : IApiCommonResponseBuilderWithData
    {
        IApiCommonResponseBuilderWithData WithMessage(ApiCommonResponseMessage message);
    }
}