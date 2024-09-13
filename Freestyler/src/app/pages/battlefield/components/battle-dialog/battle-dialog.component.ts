import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-battle-dialog',
  templateUrl: './battle-dialog.component.html',
  styleUrl: './battle-dialog.component.css'
})
export class BattleDialogComponent implements OnInit {
  timeLeft: number = 120;
  interval: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<BattleDialogComponent>) {

    this.startTimer();
  }
  ngOnInit(): void {

    console.log(this.data)
  }


  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  closeDialog(): void {
    this.dialogRef.close();
    clearInterval(this.interval);
  }
}
