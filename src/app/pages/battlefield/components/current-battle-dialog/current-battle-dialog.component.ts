import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BattleDialogComponent } from '../battle-dialog/battle-dialog.component';

@Component({
  selector: 'app-current-battle-dialog',
  templateUrl: './current-battle-dialog.component.html',
  styleUrl: './current-battle-dialog.component.css'
})
export class CurrentBattleDialogComponent {
  timeLeft: number = 120;
  interval: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CurrentBattleDialogComponent>) {

    this.startTimer();
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
