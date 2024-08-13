import { Component, Inject, inject } from '@angular/core';
import { AddEventComponent } from '../components/add-event/add-event.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { Event, EventService } from '../services/event.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-scheduler-sidebar',
  standalone: true,
  imports: [AddEventComponent, MatDialogModule, MatButtonModule],
  templateUrl: './scheduler-sidebar.component.html',
  styleUrl: './scheduler-sidebar.component.scss',
})
export class SchedulerSidebarComponent {
  private dialog = inject(MatDialog);
  createEvent() {
    this.dialog.open(AddEventComponent);
  }
}
