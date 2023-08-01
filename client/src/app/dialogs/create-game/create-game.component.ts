import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss']
})
export class CreateGameComponent {

  createGameForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ){
    this.createGameForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      image: this.image,
      released: this.released,
      developer: this.developer,
      publisher: this.publisher,
      genre: this.genre,
      franchise: this.franchise,
      platform: this.platform,
      storefront: this.storefront
    })
  }

  // CREATE GAME FORM VALIDATION
  title = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  image = new FormControl(null, [Validators.required]);
  released = new FormControl(null, [Validators.required]);
  developer = new FormControl('', [Validators.required]);
  publisher = new FormControl('', [Validators.required]);
  genre = new FormControl('', [Validators.required]);
  franchise = new FormControl('');
  platform = new FormControl([''], [Validators.required]);
  storefront = new FormControl([''], [Validators.required]);
  
  state = new FormControl('', [Validators.required]);
  acquisitionDate = new FormControl(null, [Validators.required]);
  acquisitionPrice = new FormControl(null, [Validators.required]);

  createGameSubmit(){
    
  }

}
