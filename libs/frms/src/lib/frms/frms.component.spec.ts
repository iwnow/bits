import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrmsComponent } from './frms.component';

describe('FrmsComponent', () => {
  let component: FrmsComponent;
  let fixture: ComponentFixture<FrmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrmsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
