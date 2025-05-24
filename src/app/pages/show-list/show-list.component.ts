import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './show-list.component.html',
})
export class ShowListComponent implements OnInit {
  shows: any[] = [];
  currentPage: number = 1;
  limit: number = 15;
  totalPages: number = 1;

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(): void {
    this.showService.getShows(this.currentPage, this.limit).subscribe({
      next: (response) => {
        this.shows = response.data.shows;
        this.currentPage = response.data.page;
        this.totalPages = response.data.pages;
      },
      error: (err) => console.error('Failed to load shows', err),
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadShows();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadShows();
    }
  }
}
