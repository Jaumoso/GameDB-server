import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/shared/user';
import { GameService } from 'src/app/services/game.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Storefront } from 'src/app/shared/storefront';
import { StorefrontService } from 'src/app/services/storefront.service';
import { debounceTime, of, startWith, switchMap } from 'rxjs';

export interface DialogData {
  game: any;
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
  selector: 'app-modify-game',
  templateUrl: './modify-game.component.html',
  styleUrls: ['./modify-game.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class ModifyGameComponent {

  form: FormGroup;
  library: Object[] | undefined;
  searchText: string = '';
  loadedGames: any[] = [];

  maxDate: Date | undefined;
  gameOwn: boolean = false;
  gameStorefronts: Storefront[] = [];
  gamePlatforms: any[] = [];
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
    public dialogRef: MatDialogRef<ModifyGameComponent>, 
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
      format: this.format,
      state: this.state,
      time: this.time,
      comment: this.comment
    });
  }

  // FORM VALIDATION
  gameId = new FormControl({value: this.data.game.gameId || null, disabled: true}, [Validators.required]);
  rating = new FormControl(this.data.game.rating);
  platform = new FormControl(this.data.game.platforms || null); // TODO: NOT WORKING
  storefront = new FormControl(this.data.game.storefronts || null);
  own = new FormControl(this.data.game.own, [Validators.required]);
  format = new FormControl(this.data.game.format);
  state = new FormControl(this.data.game.state || '', [Validators.required]);
  acquisitionDate = new FormControl(this.data.game.acquisitionDate || null);
  acquisitionPrice = new FormControl(this.data.game.acquisitionPrice || null, [this.negativeNumberValidator.bind(this)]);
  time = new FormControl(this.data.game.time || null, [this.negativeNumberValidator.bind(this)]);
  comment = new FormControl(this.data.game.comment || '');

  negativeNumberValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value < 0) {
      return { isNegative: true };
    }
    return null;
  }

  getPlatforms(gameId: Number) {
    const platformNames: any[] = [];
    this.gameService.getPlatformsForCurrentGame(gameId).subscribe((result) => {
      result.gamePlatforms.platforms.forEach((platform: any) => {
        platformNames.push(platform.name);
      })
    });
    return platformNames;
  }

  async ngOnInit(){
    this.own.valueChanges.subscribe((value: boolean | null) => {
      if (value !== null && value) {
        this.platform.enable();
        // this.storefront.enable();
        this.acquisitionDate.enable();
        this.acquisitionPrice.enable();
        // this.format.enable();
        // this.time.enable();
      } else {
        this.platform.disable();
        this.platform.reset();
        // this.storefront.disable();
        // this.storefront.reset();
        this.acquisitionDate.disable();
        this.acquisitionDate.reset();
        this.acquisitionPrice.disable();
        this.acquisitionPrice.reset();
        // this.format.disable();
        // this.format.reset();
        // this.time.disable();
        // this.time.reset();
      }
    });

    // BLOCK FUTURE DATES
    this.maxDate = new Date();

    // GET LIST OF STOREFRONTS
    this.storefrontService.getStorefronts().subscribe((storefronts) => {
      this.gameStorefronts = storefronts;
    });

    // GET LIST OF PLATFORMS

    this.gameService.getPlatformsForCurrentGame(this.data.game.gameId).subscribe((result) => {
      result.gamePlatforms.platforms.forEach((platform: any) => {
        this.gamePlatforms.push(platform.name);
      })});
  }

  onSubmit() {
    const game = {
      gameId: this.gameId.value,
      rating: this.rating.value || 0,
      name: this.data.game.name,
      releaseDate: this.data.game.releaseDate,
      cover: this.data.game.cover,
      platform: this.platform.value,
      storefront: this.storefront.value,
      acquisitionDate: this.acquisitionDate.value,
      acquisitionPrice: this.acquisitionPrice.value || 0,
      own: this.own.value,
      format: this.format.value,
      state: this.state.value,
      time: this.time.value || 0,
      comment: this.comment.value
    };
    this.closeDialog(game);
  }

  closeDialog(game: any): void {
    // console.log(game);
    this.dialogRef.close(game);
  }

  formatLabel(value: number): string {
    if(value > 0){
      return value + '☆';
    }
    return `${value}`;
  }

}
