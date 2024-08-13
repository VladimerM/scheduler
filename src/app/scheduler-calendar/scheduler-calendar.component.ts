import { Component, OnInit, inject } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Observable } from 'rxjs';
import { Event, EventService } from '../services/event.service';
import { CommonModule } from '@angular/common';
import { EventComponent } from '../event/event.component';
import { FilterByDayPipe } from '../pipes/filter-by-day.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEventComponent } from '../components/add-event/add-event.component';
@Component({
  selector: 'app-scheduler-calendar',
  standalone: true,
  imports: [
    CommonModule,
    EventComponent,
    FilterByDayPipe,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './scheduler-calendar.component.html',
  styleUrl: './scheduler-calendar.component.scss',
})
export class SchedulerCalendarComponent implements OnInit {
  events: Observable<Event[]>;
  days: Date[];
  hours: Date[];
  calendar: (Event | null)[][][] = [];
  private dialog = inject(MatDialog);
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.events = this.eventService.getEvents();
    this.generateCalendar(new Date());
    this.generateHours();
    this.events.subscribe((events) => {
      this.populateCalendar(events);
    });
  }

  generateCalendar(startDate: Date) {
    const start = new Date(startDate);
    start.setDate(start.getDate() - start.getDay());
    this.days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  }

  generateHours() {
    const startHour = new Date();
    startHour.setHours(0, 0, 0, 0);
    this.hours = Array.from({ length: 24 }, (_, i) => {
      const date = new Date(startHour);
      date.setHours(i);
      return date;
    });
  }

  populateCalendar(events: Event[]) {
    this.calendar = this.days.map(() => this.hours.map(() => []));

    events.forEach((event) => {
      const eventDate = new Date(event.startTime);
      const dayIndex = this.days.findIndex(
        (day) => day.toDateString() === eventDate.toDateString()
      );
      const hourIndex = eventDate.getHours();
      if (dayIndex !== -1 && hourIndex >= 0 && hourIndex < 24) {
        this.calendar[dayIndex][hourIndex].push(event);
      }
    });
  }
  previousWeek() {
    const startOfWeek = this.days[0];
    const previousWeekStart = new Date(startOfWeek);
    previousWeekStart.setDate(startOfWeek.getDate() - 7);
    this.generateCalendar(previousWeekStart);
    this.events.subscribe((events) => {
      this.populateCalendar(events);
    });
  }

  nextWeek() {
    const startOfWeek = this.days[0];
    const nextWeekStart = new Date(startOfWeek);
    nextWeekStart.setDate(startOfWeek.getDate() + 7);
    this.generateCalendar(nextWeekStart);
    this.events.subscribe((events) => {
      this.populateCalendar(events);
    });
  }

  drop(event: any) {
    if (event.previousContainer.data[event.previousIndex].length) {
      const draggedEvent = event.previousContainer.data[event.previousIndex][0];

      draggedEvent.startTime.setHours(
        this.hours[event.currentIndex].getHours()
      );

      const endTime = new Date(draggedEvent.startTime);
      endTime.setHours(endTime.getHours() + 1);

      draggedEvent.endTime = endTime;

      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
      this.eventService.updateEvent(draggedEvent);
    }
  }

  addEvent(day: Date, hour: Date): void {
    const startTime = `${hour.getHours().toString().padStart(2, '0')}:00`;
    const endTime = `${(hour.getHours() + 1).toString().padStart(2, '0')}:00`;
    const dialogRef = this.dialog.open(AddEventComponent, {
      data: {
        date: day,
        startTime: startTime,
        endTime: endTime,
      },
    });
  }

  openEvent(event: Event) {
    this.dialog.open(EventComponent, {
      data: { event },
      width: '600px',
    });
  }
}
