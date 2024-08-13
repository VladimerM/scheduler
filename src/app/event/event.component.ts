import { Component, Inject, Input } from '@angular/core';
import { Event, EventService } from '../services/event.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, MatButtonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent {
  event = this.data.event;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventService: EventService
  ) {}

  deleteEvent(): void {
    this.eventService.deleteEvent(this.event.id);
  }
}
