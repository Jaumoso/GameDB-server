import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  gameName: String;
  deleteGame: boolean;
}

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.scss']
})
export class DeleteGameComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ){}

  onSubmit(){
    this.data.deleteGame = true;
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close(this.data.deleteGame);
  }
}
