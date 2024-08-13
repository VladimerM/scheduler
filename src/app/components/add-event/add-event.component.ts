import {
  Component,
  EventEmitter,
  inject,
  Output,
  OnInit,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Event, EventService } from '../../services/event.service';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss',
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;

  private fb: FormBuilder = inject(FormBuilder);
  private eventService = inject(EventService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      title: [null, Validators.required],
      description: [''],
      date: [this.data?.date || new Date(), Validators.required],
      startTime: [this.data?.startTime || '00:00', Validators.required],
      endTime: [this.data?.endTime || '00:00', Validators.required],
    });
  }

  private createDateTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, 0, 0);
    return dateTime;
  }
  createEvent() {
    const form = this.eventForm.getRawValue();
    const event: Event = {
      id: this.eventService.getId(),
      title: form.title,
      description: form.description,
      startTime: this.createDateTime(form.date, form.startTime),
      endTime: this.createDateTime(form.date, form.endTime),
      date: form.date,
    };

    this.eventService.addEvent(event);
  }
}
