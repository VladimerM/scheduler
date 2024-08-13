import { Component } from '@angular/core';
import { SchedulerCalendarComponent } from '../scheduler-calendar/scheduler-calendar.component';
import { SchedulerSidebarComponent } from '../scheduler-sidebar/scheduler-sidebar.component';

@Component({
  selector: 'app-scheduler',
  standalone: true,
  imports: [SchedulerCalendarComponent, SchedulerSidebarComponent],
  templateUrl: './scheduler.component.html',
  styleUrl: './scheduler.component.scss',
})
export class SchedulerComponent {}
