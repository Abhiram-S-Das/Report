

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api.service';
import * as Papa from 'papaparse';

interface DistrictData {
  district: string;
  confirmed: number;
  recovered: number;
  active: number;
  deceased: number;
  total_obs: number;
  hospital_obs: number;
  home_obs: number;
  hospital_today: number;
}

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  data: any = [];
  processedData: DistrictData[] = [];
  displayedColumns: string[] = ['confirmed', 'recovered', 'active', 'total_obs', 'hospital_obs', 'district'];
  dataSource = new MatTableDataSource<DistrictData>(this.processedData);

  @ViewChild(MatPaginator) paginator: any;

  customColumnNames: { [key: string]: string } = {
    'confirmed': 'Confirmed Cases',
    'recovered': 'Recovered Cases',
    'active': 'Active Cases',
    'total_obs': 'Total Observations',
    'hospital_obs': 'Hospital Observations',
    'district': 'District'

  };

  constructor(private service: ApiService) { }

  ngOnInit(): void {
    this.service.getData().subscribe({
      next: (response: any) => {
        console.log(response);
        this.data = response;
        console.log(this.data.summary);

        this.processedData = Object.keys(this.data.summary).map((district) => ({
          district: district,
          confirmed: this.data.summary[district].confirmed,
          recovered: this.data.summary[district].recovered,
          active: this.data.summary[district].active,
          deceased: this.data.summary[district].deceased,
          total_obs: this.data.summary[district].total_obs,
          hospital_obs: this.data.summary[district].hospital_obs,
          home_obs: this.data.summary[district].home_obs,
          hospital_today: this.data.summary[district].hospital_today
        }));

        this.processedData.forEach((data) => {
          data.district = data.district;
        });

        console.log(this.processedData);
        this.dataSource = new MatTableDataSource<DistrictData>(this.processedData);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  downloadCSV() {
    const csvData = Papa.unparse(this.processedData);

    const blob = new Blob([csvData], { type: 'text/csv' });

    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'grid_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}


