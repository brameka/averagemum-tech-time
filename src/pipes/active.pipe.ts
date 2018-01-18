import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'active',
    pure: false
})
export class ActivePipe implements PipeTransform {
    transform(items: any[]): any {
        if (!items) {
            return items;
        }
        return items.filter(item => item.active);
    }
}
