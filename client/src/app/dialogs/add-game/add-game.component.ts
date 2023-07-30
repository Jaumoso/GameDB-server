import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';
import { CreateGameComponent } from '../create-game/create-game.component';
import { Game } from 'src/app/shared/game';
import { GameService } from 'src/app/services/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface DialogData {
  user: User;
}

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss']
})
export class AddGameComponent {

  library: any[] = [];
  game: Game | undefined;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddGameComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private createGameDialog: MatDialog,
    private userService: UserService,
    private gameService: GameService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
  ){
    this.form = this.formBuilder.group({
      gameId: this.gameId,
      rating: this.rating,
      platform: this.platform,
      storefront: this.storefront,
      own: this.own,
      state: this.state,
    })
  }

  // FORM VALIDATION
  gameId = new FormControl(null,[Validators.required]);
  rating = new FormControl(0,[Validators.required]);
  platform = new FormControl('',[Validators.required]);
  storefront = new FormControl('',[Validators.required]);
  own = new FormControl(true,[Validators.required]);
  state = new FormControl('',[Validators.required]);

  ngOnInit(){
    this.library = this.data.user.library!;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(){
      this.data.user.library
    this.userService.updateUserContent(this.data.user._id!, this.data.user)
    .then(() => {
      this.closeDialog()
    })
    .catch((error) => {
      console.error(error);
    });
  }

  createGame(){
    const dialogRef = this.createGameDialog.open(CreateGameComponent, {
      data: { game: this.game }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.game){
        this.gameService.createGame(result.game)
        .then(() => {
          // if game is created
          this.snackBar.open(
            "Game created and added to the database", 
            "OK",
            {
              verticalPosition: 'top',
              duration: 6000,
              panelClass: ['snackbar']
            });
        });
      }
    });
  }

}
