import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Event {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  date: Date;
}

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private events = new BehaviorSubject<Event[]>([]);
  events$ = this.events.asObservable();

  constructor() {
    if (localStorage.getItem('events')) {
      const events: any = JSON.parse(localStorage.getItem('events') as string);
      events.forEach((item: Event) => {
        item.startTime = new Date(item.startTime);
      });
      this.events.next(events);
    }
  }

  getEvents() {
    return this.events$;
  }

  addEvent(event: Event) {
    const currentEvents = this.events.value;
    this.events.next([...currentEvents, event]);
    localStorage.setItem('events', JSON.stringify(this.events.getValue()));
  }

  updateEvent(updatedEvent: Event) {
    const currentEvents = this.events.value.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    this.events.next(currentEvents);
    localStorage.setItem('events', JSON.stringify(this.events.getValue()));
  }

  deleteEvent(eventId: number) {
    const currentEvents = this.events.value.filter(
      (event) => event.id !== eventId
    );
    this.events.next(currentEvents);
    localStorage.setItem('events', JSON.stringify(this.events.getValue()));
  }

  getId() {
    if (this.events.getValue().length) {
      return this.events.getValue()[this.events.getValue().length - 1].id + 1;
    } else {
      return 1;
    }
  }
}
