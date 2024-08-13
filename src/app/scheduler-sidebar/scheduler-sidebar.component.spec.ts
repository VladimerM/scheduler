import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerSidebarComponent } from './scheduler-sidebar.component';

describe('SchedulerSidebarComponent', () => {
  let component: SchedulerSidebarComponent;
  let fixture: ComponentFixture<SchedulerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulerSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
