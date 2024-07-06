import { keyframes } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
export interface Reward {
  pk: number;
  name?: string |null;
  points?: number |null;
  display_img_url?: string |null;
  quantity?: number |null;
  valid_until?: string |null;
  low_quantity?: number |null;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  rewardsData:Reward[]=[]
  constructor(
    private http: HttpClient
  ) { 
    this.filteredRewards = this.rewardsData;
  }
  searchTerm: string = '';
  filteredRewards: Reward[] = [];
  sideNavOpen: boolean = false;
 
  ngOnInit(): void {
  this.getData();
 
}


toggleSideNav() {
  this.sideNavOpen = !this.sideNavOpen;
}

closeSideNav() {
  this.sideNavOpen = false;
}
onSearchChange(event: any) {
 let value = event.target.value.trim().toLowerCase();
 if(value){
let filtervalue = this.rewardsData.filter((item: any) =>
  item.name.toLowerCase().includes(value) 
)
this.rewardsData=filtervalue
console.log(filtervalue);

 }else{
 if(this.searchTerm==''){
this.rewardsData=JSON.parse(JSON.stringify(this.filteredRewards)) 
 }
 }

}
getData(){
  this.http.get<any[]>('./assets/json/rewardsGetall.json').subscribe(
    (data) => {
      this.rewardsData = data; // Assign fetched data to rewardsData
   this.filteredRewards=this.rewardsData

    },
    (error) => {
      console.error('Error loading comparison.json', error);
    }
  );
}
sortByNameAscending() {
  this.rewardsData.sort((a, b) => {
    if (a.name && b.name) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    }
    return 0;
  });
}

sortByNameDescending() {
  this.rewardsData.sort((a, b) => {
    if (a.name && b.name) {
      return a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1;
    }
    return 0;
  });
}

applyFilters() {
  this.sideNavOpen = false;
}
}


