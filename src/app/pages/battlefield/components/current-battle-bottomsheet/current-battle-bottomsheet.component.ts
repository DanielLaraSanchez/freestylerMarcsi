import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { BattleDialogComponent } from '../battle-dialog/battle-dialog.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { CurrentBattleDialogComponent } from '../current-battle-dialog/current-battle-dialog.component';

@Component({
  selector: 'app-current-battle-bottomsheet',
  templateUrl: './current-battle-bottomsheet.component.html',
  styleUrl: './current-battle-bottomsheet.component.css'
})
export class CurrentBattleBottomsheetComponent implements OnDestroy, OnInit {
  private breakpointSubscription: Subscription | any;
  private width: string = '75vw';
  private height: string = '75vh';
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<CurrentBattleBottomsheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver,
  ) {}
  ngOnInit(): void {
    this.breakpointSubscription = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
    .subscribe(result => {
      if (result.matches) {
        this.width = '100vw';
        this.height = '100vh';
        console.log("mobile", this.width, this.height)
      }
  });
  }

  ngOnDestroy(): void {
      this.breakpointSubscription.unsubscribe();

  }


  closeSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  watchBattle(): void {
    this.closeSheet();


        this.dialog.open(CurrentBattleDialogComponent, {
          data: { user1: this.data.user1, user2: this.data.user2 },
          minWidth: this.width,
          minHeight: this.height,
          width: this.width,
          height: this.height,
          maxWidth: this.width,
          maxHeight: this.height,
          panelClass: 'custom-dialog-container',
          disableClose: true,
          hasBackdrop: true,
          ariaLabel: 'Battle dialog',
          autoFocus: false,
          backdropClass: 'dialog-backdrop',
          restoreFocus: true
        }).afterClosed().subscribe(() => {
          // Re-subscribe after the dialog is closed
          if (this.breakpointSubscription) {
            this.breakpointSubscription.unsubscribe();
          }
        });


    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }

}
