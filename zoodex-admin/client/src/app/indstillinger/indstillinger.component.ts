import { Component, OnInit} from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { SidebarService } from '../sidebar.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-indstillinger',
  standalone: true,
  imports: [SidebarComponent, CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './indstillinger.component.html',
  styleUrl: './indstillinger.component.css'
})
export class IndstillingerComponent implements OnInit {
  selectedTheme: string = ''; // Variable to track selected theme
  selectedLanguage: string = ''; // Variable to track selected language
  selectedNotifications: string[] = []; // Array to track selected notifications
  languages: string[] = ['Dansk', 'English', 'Deutsch', 'Français', 'Español']; // List of available languages

  constructor(public sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarService.open();

    // Load saved preferences from localStorage
    const savedTheme = localStorage.getItem('selectedTheme');
    const savedLanguage = localStorage.getItem('selectedLanguage');
    const savedNotifications = localStorage.getItem('selectedNotifications');

    if (savedTheme) {
      this.selectedTheme = savedTheme; // Restore the saved theme
    }

    if (savedLanguage) {
      this.selectedLanguage = savedLanguage; // Restore the saved language
    }

    if (savedNotifications) {
      this.selectedNotifications = JSON.parse(savedNotifications); // Restore the saved notifications
    }
  }

  selectTheme(theme: string): void {
    this.selectedTheme = theme; // Update the selected theme
    localStorage.setItem('selectedTheme', theme); // Save the selected theme to localStorage
  }

  selectLanguage(event: Event): void {
    const target = event.target as HTMLSelectElement; // Cast the target to HTMLSelectElement
    this.selectedLanguage = target.value; // Extract the selected value
    localStorage.setItem('selectedLanguage', this.selectedLanguage); // Save the selected language to localStorage
    console.log('Selected language:', this.selectedLanguage); // Optional: Log the selected language
  }

  toggleNotification(notification: string): void {
    const index = this.selectedNotifications.indexOf(notification);
    if (index === -1) {
      // Add the notification if it's not already selected
      this.selectedNotifications.push(notification);
    } else {
      // Remove the notification if it's already selected
      this.selectedNotifications.splice(index, 1);
    }
    // Save the updated notifications array to localStorage
    localStorage.setItem('selectedNotifications', JSON.stringify(this.selectedNotifications));
    console.log('Selected notifications:', this.selectedNotifications); // Optional: Log the selected notifications
  }
}

