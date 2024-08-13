import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../services/event.service';

@Pipe({
  name: 'filterByDay',
  standalone: true,
})
export class FilterByDayPipe implements PipeTransform {
  transform(events: Event[] | null, day: Date, hour: Date): Event[] {
    if (!events || !day || !hour) {
      return [];
    }

    const startOfDay = new Date(day);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(day);
    endOfDay.setHours(23, 59, 59, 999);

    const startOfHour = new Date(day);
    startOfHour.setHours(hour.getHours(), 0, 0, 0);

    const endOfHour = new Date(day);
    endOfHour.setHours(hour.getHours(), 59, 59, 999);

    return events.filter(
      (event) =>
        new Date(event.startTime) >= startOfHour &&
        new Date(event.startTime) <= endOfHour
    );
  }
}
