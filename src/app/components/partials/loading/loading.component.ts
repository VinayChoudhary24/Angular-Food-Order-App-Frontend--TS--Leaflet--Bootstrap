import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  // To Store and Show Loading in HTML
  isLoading!: boolean;

  constructor( private loadingService: LoadingService ) { }

  ngOnInit(): void {
    this.loadingService.isLoadingGetter.subscribe( (isLoading) => {
      this.isLoading = isLoading;
    });
    // to Test
    // this.loadingService.showLoading();
  }

}
