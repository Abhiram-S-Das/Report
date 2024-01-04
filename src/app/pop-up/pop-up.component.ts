

import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  places = [
    'Thiruvananthapuram',
    'Kollam',
    'Pathanamthitta',
    'Alappuzha',
    'Kottayam',
    'Idukki',
    'Ernakulam',
    'Thrissur',
    'Palakkad',
    'Malappuram',
    'Kozhikode',
    'Wayanad',
    'Kannur',
    'Kasaragod'
  ];

  selectedDistrict: string = '';
  districtData: any;

  constructor(private service: ApiService) { }

  onDistrictSelected(): void {
    if (this.selectedDistrict) {
      this.service.getData().subscribe(data => {
        this.districtData = data.summary[this.selectedDistrict];
      });
    } else {
      this.districtData = null;
    }
  }
}

