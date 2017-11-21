using FluentValidation;
using StockApi.Models;

namespace StockApi.Services
{
    public class ProductValidator : AbstractValidator<Product>
    {
        /// <summary>  
        /// Validator rules for Product  
        /// </summary>  
        public ProductValidator()
        {

            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("El nombre del producto no puede estar vacío.")
                .Length(3, 30)
                .WithMessage("El nombre del producto debe tener mínimo 3 y máximo 30 caracteres");

            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage("La descripción del producto no puede estar vacía.");

            RuleFor(x => x.State)
                .NotEmpty()
                .WithMessage("El estado del producto no puede estar vacío.");
        }
    }
}