import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShowService } from '../../services/show.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  imports: [CommonModule, RouterModule],
})
export class ShowDetailsComponent implements OnInit {
  show: any = null;
  error: string = '';
  loading: boolean = false;
  queryParams: any = {};

  constructor(
    private showService: ShowService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.queryParams = {
        page: params['page'] || 1,
        limit: params['limit'] || 15,
        query: params['query'] || '',
        type: params['type'] || '',
      };
    });
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.showService.getShowById(id).subscribe({
        next: (response: any) => {
          this.show = response.data;
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error.message || 'Failed to load show';
          this.loading = false;
        },
      });
    }
  }
}
