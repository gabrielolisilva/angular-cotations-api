import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCotationComponent } from './single-cotation.component';

describe('SingleCotationComponent', () => {
  let component: SingleCotationComponent;
  let fixture: ComponentFixture<SingleCotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCotationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
