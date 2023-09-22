import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteGameComponent } from './delete-game.component';

describe('DeleteGameComponent', () => {
  let component: DeleteGameComponent;
  let fixture: ComponentFixture<DeleteGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteGameComponent]
    });
    fixture = TestBed.createComponent(DeleteGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
