import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { PopUpComponent } from '../pop-up/pop-up.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {



  constructor(private dialogRef: MatDialog) { }


  openDialog(): void {
    const dialogRef = this.dialogRef.open(PopUpComponent, {
      width: '400px',
      height: '550px',


    });
  }


}




