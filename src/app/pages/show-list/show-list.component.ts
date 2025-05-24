import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ShowListComponent implements OnInit {
  shows: any[] = [];
  currentPage: number = 1;
  limit: number = 15;
  totalPages: number = 1;
  searchQuery: string = '';
  selectedType: string = '';
  error: string = '';
  loading: boolean = false;
  currentQueryParams: any = {};

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = parseInt(params['page']) || 1;
      this.limit = parseInt(params['limit']) || 15;
      this.searchQuery = params['query'] || '';
      this.selectedType = params['type'] || '';
      this.updateQueryParams();
      this.loadShows();
    });
  }

  loadShows(): void {
    this.error = '';
    if (this.searchQuery) {
      this.showService
        .searchShows(this.searchQuery, this.currentPage, this.limit)
        .subscribe({
          next: (response) => {
            this.shows = response.data.shows;
            this.currentPage = response.data.page;
            this.totalPages = response.data.pages;
            this.loading = false;
            this.updateQueryParams();
          },
          error: (err) => {
            this.error = err.error.message || 'Failed to search shows';
            this.shows = [];
            this.loading = false;
          },
        });
    } else {
      this.showService
        .getShows(this.currentPage, this.limit, this.selectedType)
        .subscribe({
          next: (response) => {
            this.shows = response.data.shows;
            this.currentPage = response.data.page;
            this.totalPages = response.data.pages;
            this.updateQueryParams();
            this.loading = false;
          },
          error: (err) => {
            this.error = err.error.message || 'Failed to load shows';
            this.shows = [];
            this.loading = false;
          },
        });
    }
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadShows();
  }

  onTypeChange(): void {
    this.searchQuery = '';
    this.currentPage = 1;
    this.loadShows();
  }

  onLimitChange(): void {
    this.currentPage = 1;
    this.loadShows();
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

  private updateQueryParams(): void {
    this.currentQueryParams = { page: this.currentPage, limit: this.limit };
    if (this.searchQuery) {
      this.currentQueryParams.query = this.searchQuery;
    }
    if (this.selectedType) {
      this.currentQueryParams.type = this.selectedType;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.currentQueryParams,
      replaceUrl: true,
    });
  }
}
