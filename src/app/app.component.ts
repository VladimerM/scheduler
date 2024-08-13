import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SchedulerComponent } from './scheduler/scheduler.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SchedulerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'scheduler-app';
}
