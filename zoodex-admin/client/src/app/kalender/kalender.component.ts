import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CalendarModule, DateAdapter, CalendarUtils, CalendarA11y, CalendarDateFormatter, CalendarEventTitleFormatter, CalendarView } from 'angular-calendar'; // Import CalendarView
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { CalendarEvent } from 'angular-calendar'; // Import CalendarEvent
import { CalendarCommonModule } from 'angular-calendar'; // Import CalendarCommonModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';

// Custom date format for day-month-year 
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Format for parsing input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Format for displaying input
    monthYearLabel: 'MMM YYYY', // Format for month/year label
    dateA11yLabel: 'LL', // Accessibility label for date
    monthYearA11yLabel: 'MMMM YYYY', // Accessibility label for month/year
  },
};

// Extend the CalendarEvent interface to include a description property
interface CustomCalendarEvent extends CalendarEvent {
  description?: string; // Add the description property
}
 
@Component({
  selector: 'app-kalender',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    CalendarModule,
    CalendarCommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TimepickerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }, // Add this
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Set locale to British English
    CalendarUtils,
    CalendarA11y,
    CalendarDateFormatter,
    CalendarEventTitleFormatter,
    SidebarService,
  ],
  templateUrl: './kalender.component.html',
  styleUrls: ['./kalender.component.css'],
})
export class KalenderComponent implements OnInit {
  viewDate: Date = new Date(); // Current date
  view: CalendarView = CalendarView.Month; // Default view is Month
  CalendarView = CalendarView; // Expose CalendarView enum to the template

  events: CustomCalendarEvent[] = []; // Array to store events
  selectedEvent: CustomCalendarEvent | null = null; // Track the event being edited
  isEditModalOpen: boolean = false; // Track whether the edit modal is open

  isModalOpen = false; // Track whether the modal is open
  selectedDate: Date | null = null; // Track the selected date for the event

  newEvent = {
    title: '',
    startDate: '',
    startTime: '', // Keep as string
    endDate: '',
    endTime: '',   // Keep as string
    description: ''
  };
  showEventList = false; // Default to hiding the event list
  
  constructor(public sidebarService: SidebarService) {}

  ngOnInit(): void {
    console.log('View Date:', this.viewDate);
    console.log('Events:', this.events);
    this.sidebarService.open();
  }

  // Navigate to the previous month
  previousMonth(): void {
    const currentMonth = this.viewDate.getMonth();
    this.viewDate = new Date(this.viewDate.getFullYear(), currentMonth - 1, 1);
  }

  // Navigate to the next month
  nextMonth(): void {
    const currentMonth = this.viewDate.getMonth();
    this.viewDate = new Date(this.viewDate.getFullYear(), currentMonth + 1, 1);
  }

  // Calculate the ISO week number
  private getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    tempDate.setDate(tempDate.getDate() + 6 - tempDate.getDay()); // Adjust to Saturday in the current week
    const yearStart = new Date(tempDate.getFullYear(), 0, 1);
    const weekNo = Math.ceil(((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    return weekNo;
  }

  // Get the current title based on the selected view
  getCurrentTitle(): string {
    const year = this.viewDate.getFullYear();

    if (this.view === CalendarView.Month) {
      const month = this.viewDate.toLocaleString('default', { month: 'long' });
      return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${year}`;
    } else if (this.view === CalendarView.Week) {
      const weekNumber = this.getWeekNumber(this.viewDate);

      // Calculate the start and end of the week (Sunday to Saturday)
      const startOfWeek = new Date(this.viewDate);
      const dayOfWeek = startOfWeek.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const diffToSunday = -dayOfWeek; // Adjust to Sunday as the start of the week
      startOfWeek.setDate(this.viewDate.getDate() + diffToSunday);

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)

      const start = startOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' });
      const end = endOfWeek.toLocaleDateString('default', { month: 'short', day: 'numeric' });

      return `Week ${weekNumber}: ${start} - ${end}, ${year}`;
    } else if (this.view === CalendarView.Day) {
      const day = this.viewDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
      return `Day: ${day}`;
    }

    return '';
  }

  handleEvent(event: any): void {
    console.log('Event clicked:', event);
  }

  // Handle event click
  onEventClick(event: CustomCalendarEvent): void {
    this.selectedEvent = event; // Set the selected event
    console.log('Event clicked:', event);
  }

  // Close the event details modal
  closeEventDetails(): void {
    console.log('Closing event details modal');
    this.selectedEvent = null; // Clear the selected event
  }

  // Change the calendar view
  changeView(event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast event.target to HTMLSelectElement
    const selectedView = target.value;

    // Update the view based on the selected value
    if (selectedView === 'month') {
      this.view = CalendarView.Month;
    } else if (selectedView === 'week') {
      this.view = CalendarView.Week;
    } else if (selectedView === 'day') {
      this.view = CalendarView.Day;
    }
  }

  // Open the modal for adding an event
  openAddEventModal(date: Date): void {
    this.selectedDate = date;
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal(): void {
    this.isModalOpen = false;
    this.newEvent = { title: '', startDate: '', startTime: '', endDate: '', endTime: '', description: '' };
  }

  // Add a new event
  addEvent(event: Event): void {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Ensure all required fields are filled
    if (!this.newEvent.startDate || !this.newEvent.startTime || !this.newEvent.endDate || !this.newEvent.endTime) {
      console.error('All fields are required.');
      return;
    }

    // Parse the start time (HH:mm) into hours and minutes
    const [startHours, startMinutes] = this.newEvent.startTime.split(':').map(Number);
    const startDate = new Date(this.newEvent.startDate);
    startDate.setHours(startHours, startMinutes);

    // Parse the end time (HH:mm) into hours and minutes
    const [endHours, endMinutes] = this.newEvent.endTime.split(':').map(Number);
    const endDate = new Date(this.newEvent.endDate);
    endDate.setHours(endHours, endMinutes);

    // Validate that the end date/time is after the start date/time
    if (endDate <= startDate) {
      console.error('End date/time must be after start date/time.');
      return;
    }

    // Add the new event to the events array
    this.events = [
      ...this.events, // Spread existing events
      {
        start: startDate,
        end: endDate,
        title: this.newEvent.title,
        description: this.newEvent.description,
        color: { primary: '#ad2121', secondary: '#FAE3E3' },
        allDay: false
      }
    ];

    // Close the modal and reset the form
    this.closeModal();

    console.log('Event added:', this.events);
  }

  // Open the modal to edit an event
  openEditEventModal(event: CustomCalendarEvent): void {
    this.closeEventDetails(); // Close the event details modal
    this.selectedEvent = { ...event }; // Clone the event to avoid direct mutation
    this.isEditModalOpen = true; // Open the edit modal
  }

  saveEventChanges(): void {
    if (!this.selectedEvent) {
      console.error('No event selected for editing');
      return;
    }

    // Find the index of the selected event in the events array
    const index = this.events.findIndex(e => e === this.selectedEvent);
    if (index !== -1) {
      this.events[index] = { ...this.selectedEvent }; // Update the event in the array
    }

    this.closeEditModal();
    console.log('Updated events:', this.events);
  }

  // Delete an event
  deleteEvent(event: CustomCalendarEvent): void {
    this.events = this.events.filter(e => e !== event); // Remove the event from the array
    console.log('Event deleted:', event);
    console.log('Updated events:', this.events);
    this.closeEventDetails(); // Close the event details modal
  }

  // Close the edit modal
  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedEvent = null;
  }

  onTimeChange(type: string, value: string): void {
    console.log(`${type} time changed:`, value);
    if (type === 'start') {
      this.newEvent.startTime = value;
    } else if (type === 'end') {
      this.newEvent.endTime = value;
    }
  }
}

