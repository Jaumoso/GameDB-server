import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/user';
import { GameService } from 'src/app/services/game.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Storefront } from 'src/app/shared/storefront';
import { StorefrontService } from 'src/app/services/storefront.service';
import { debounceTime, of, startWith, switchMap } from 'rxjs';

export interface DialogData {
  library: User["library"];
}

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
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
  library: Object[] | undefined;
  searchText: string = '';
  loadedGames: any[] = [];
  covers: any[] = [];
  selectedGamePlatforms: any[] = [];

  maxDate: Date | undefined;
  gameOwn: boolean = false;
  platforms: any[] = [];
  storefronts: any[] = [];
  gameStorefronts: Storefront[] = [];
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
    private gameService: GameService,
    private formBuilder: FormBuilder,
    private storefrontService: StorefrontService
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
    });
  }

  // FORM VALIDATION
  gameId = new FormControl(null, [Validators.required]);
  rating = new FormControl(0);
  platform = new FormControl(null);
  storefront = new FormControl('');
  own = new FormControl(true, [Validators.required]);
  state = new FormControl('', [Validators.required]);
  acquisitionDate = new FormControl(null);
  acquisitionPrice = new FormControl(null);

  ngOnInit(){
    this.setupSearchObserver();
    
    this.own.valueChanges.subscribe((value: boolean | null) => {
      if (value !== null && value) {
        this.platform!.enable();
        this.storefront!.enable();
        this.acquisitionDate!.enable();
        this.acquisitionPrice!.enable();
      } else {
        this.platform!.disable();
        this.platform!.reset();
        this.storefront!.disable();
        this.storefront!.reset();
        this.acquisitionDate!.disable();
        this.acquisitionDate!.reset();
        this.acquisitionPrice!.disable();
        this.acquisitionPrice!.reset();
      }
    });

    // BLOCK FUTURE DATES
    this.maxDate = new Date();

    // GET LIST OF STOREFRONTS
    this.storefrontService.getStorefronts().subscribe((storefronts) => {
      this.gameStorefronts = storefronts;
    });
  }

  private setupSearchObserver(): void {
    this.form
    .get('gameId')
    ?.valueChanges.pipe(
      startWith(''), // Emit initial value
      debounceTime(300), // Delay to avoid rapid searches
      // distinctUntilChanged(), // Ignore same consecutive values
      switchMap(searchText => {
        if (searchText === '') {
          // If search text is empty, return an empty array
          return of([]);
        } else {
          // Otherwise, perform the actual search
          return this.gameService.gameSearch(searchText);
        }
      })
    ).subscribe((games: any[]) => {
        this.loadedGames = games.map(game => ({
          id: game.id,
          name: game.name,
          first_release_date: game.first_release_date,
          cover: game.cover,
          platforms: game.platforms?.map((platform: { id: any; name: any }) => ({
            id: platform.id,
            name: platform.name
          }))
        }));
      });
  }

  onSubmit() {
    // TODO: save game info in user library
    const game = {
      gameId: this.gameId!.value || undefined,
      rating: this.rating!.value || undefined,
      platform: this.platform!.value || undefined,
      storefront: this.storefront!.value || undefined,
      acquisitionDate: this.acquisitionDate!.value || undefined,
      acquisitionPrice: this.acquisitionPrice!.value || undefined,
      own: this.own!.value || false,
      state: this.state!.value || undefined,
    };
    this.closeDialog(game);
  }

  // gameSearch(): void {
  //   if (this.searchText !== '') {
  //     this.gameService.gameSearch(this.searchText).subscribe((games: any[]) => {
  //       this.loadedGames = games.map(game => ({
  //         id: game.id,
  //         name: game.name,
  //         first_release_date: game.first_release_date,
  //         cover: game.cover?.url,
  //         platforms: game.platforms?.map((platform: { id: any; name: any; }) => ({ id: platform.id, name: platform.name }))
  //       }));
  //       console.log(this.loadedGames)
  //     });
  //   }
  // }

  selectedGame(gameId: number) {
    const targetGame = this.loadedGames.find((game: any) => game.id === gameId);
    this.selectedGamePlatforms = targetGame?.platforms;
  }

  closeDialog(game: any): void {
    this.dialogRef.close(game);
  }

  formatLabel(value: number): string {
    if(value > 0){
      return value + '☆';
    }
    return `${value}`;
  }

}
