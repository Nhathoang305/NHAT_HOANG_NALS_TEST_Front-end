import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  public hideShowLoading:boolean = false
  public constructor() { }

  public ngOnInit(): void {
  }

  public openModal() {
    this.hideShowLoading = true;
  }

  public closeModal() {
    this.hideShowLoading = false;
  }
}
