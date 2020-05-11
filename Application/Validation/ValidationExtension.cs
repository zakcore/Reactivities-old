using FluentValidation;

namespace Application.Validation
{
    public static class ValidationExtension
    {
        public static IRuleBuilder<T,string> Password<T>(this IRuleBuilder<T,string> ruleBuilder){

            var options=ruleBuilder
            .NotEmpty()
            .MinimumLength(6).WithMessage("Password length must be at least 6 characters")
            .Matches("[a-z]").WithMessage("Password must contain a least 1 lowercase character")
            .Matches("[A-Z]").WithMessage("Password must contain a least 1 UpperCase character")
            .Matches("[0-9]").WithMessage("Password must contain a least  a number")
            .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain a least a non alphanumeric");
            return options;



        }
    }
}