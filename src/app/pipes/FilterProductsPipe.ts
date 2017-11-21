import { Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'filterproducts',  
    pure: false  
})  
  
export class FilterProductsPipe implements PipeTransform {  
    transform(items: any[], filter: string): any {  
        if (!items || !filter) {  
            return items;  
        }  
        return items.filter(item => item.Name.toLowerCase().indexOf(filter) !== -1 || item.Description.toLowerCase().indexOf(filter) !== -1);  
    }  
}  