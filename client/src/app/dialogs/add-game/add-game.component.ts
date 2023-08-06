import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';
import { GameService } from 'src/app/services/game.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

export interface DialogData {
  user: User;
}

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class AddGameComponent {

  form: FormGroup;
  // FORM VALIDATION
  gameId = new FormControl(null, [Validators.required]);
  rating = new FormControl(0, [Validators.required]);
  platform = new FormControl(null, [Validators.required]);
  storefront = new FormControl('', [Validators.required]);
  own = new FormControl(true, [Validators.required]);
  state = new FormControl('', [Validators.required]);
  acquisitionDate = new FormControl(null, [Validators.required]);
  acquisitionPrice = new FormControl(null, [Validators.required]);

  // library: Object[] | undefined;
  searchText: string = '';
  loadedGames: any[] = [];
  covers: any[] = [];
  selectedGamePlatforms: any[] = [];

  maxDate: Date | undefined;
  gameOwn: boolean = false;
  platforms: any[] = [];
  storefronts: any[] = [];
  gameStates: string[] = [
    'Not Interested',
    'Wishlist',
    'Backlog',
    'Tried',
    'Playing',
    'Played',
    'Completed',
    'Retired',
    'Shelved',
    'Abandoned'];

  constructor(
    public dialogRef: MatDialogRef<AddGameComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private gameService: GameService,
    private formBuilder: FormBuilder,
  ){
    this.form = this.formBuilder.group({
      gameId: this.gameId,
      rating: this.rating,
      platform: this.platform,
      storefront: this.storefront,
      acquisitionDate: this.acquisitionDate,
      acquisitionPrice: this.acquisitionPrice,
      own: this.own,
      state: this.state,
    })

    // GET CURRENT DATE
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date();

    // LOAD USER LIBRARY
    // TODO: compare to user library
    // this.library = this.data.user.library! || undefined;
  }



  closeDialog(): void {
    this.dialogRef.close();
  }

  formatLabel(value: number): string {
    if(value > 0){
      return value + '☆';
    }
    return `${value}`;
  }

  onSubmit(){
    // TODO: save game info in user library
    // this.data.user.library?.push()
    this.userService.updateUserContent(this.data.user._id!, this.data.user)
    .then(() => {
      this.closeDialog()
    })
    .catch((error) => {
      console.error(error);
    });
  }

  gameSearch(): void {
    if (this.searchText !== '') {
      this.gameService.searchGames(this.searchText).subscribe((games: any[]) => {
        this.loadedGames = games.map(game => ({
          id: game.id,
          name: game.name,
          first_release_date: game.first_release_date,
          cover: game.cover?.url,
          platforms: game.platforms?.map((platform: { id: any; name: any; }) => ({ id: platform.id, name: platform.name }))
        }));
        console.log(this.loadedGames)
      });
    }
  }

  selectedGame(gameId: number) {
    const targetGame = this.loadedGames.find((game: any) => game.id === gameId);
    this.selectedGamePlatforms = targetGame?.platforms;
  }

}
