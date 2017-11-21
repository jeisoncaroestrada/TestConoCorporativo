using FluentValidation.Attributes;
using StockApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StockApi.Models
{
    [Validator(typeof(ProductValidator))]
    public class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
    }
}