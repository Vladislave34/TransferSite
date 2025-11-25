using Core.Models.Location;
using Domain;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Core.Validators.Country;

public class CountryEditValidator : AbstractValidator<CountryEditModel>
{
    public CountryEditValidator(AppDbTransferContext db)
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Індекс країни не може бути порожнім")
            .DependentRules(() =>
            {
                RuleFor(x => x.Id)
                    .MustAsync(async (id, cancellation) =>
                        await db.Countries.AnyAsync(c =>
                                c.Id == id,
                            cancellation
                        )
                    )
                    .WithMessage("З таким id нема країни");
            });

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Назва країни не може бути порожньою")
            .MaximumLength(100).WithMessage("Назва країни не може перевищувати 100 символів");


      RuleFor(x => x.Code)
          .NotEmpty().WithMessage("Код країни не може бути порожнім")
          .MaximumLength(10).WithMessage("Код країни не може перевищувати 10 символів");


        RuleFor(x => x.Slug)
            .NotEmpty().WithMessage("Slug країни не може бути порожнім")
            .MaximumLength(100).WithMessage("Slug країни не може перевищувати 100 символів");




    }
}