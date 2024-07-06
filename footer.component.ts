import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  date = new Date();
  currentYear = this.date.getFullYear();
  // console.log(this.currentYear)
  constructor() { }

  ngOnInit(): void {
  }

}
