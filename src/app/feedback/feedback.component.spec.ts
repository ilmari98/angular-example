import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedbackComponent } from './feedback.component';
import { Router } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import { provideRouter } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { fakeAsync, tick } from '@angular/core/testing';


describe('FeedbackComponent', () => {
  let component: FeedbackComponent;
  let fixture: ComponentFixture<FeedbackComponent>;
  let router: Router;
  let routerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackComponent, BrowserAnimationsModule,ReactiveFormsModule],
      /*schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]*/
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('cancel-button navigattes to home page', () => {
    component.cancel();    
    expect(routerSpy).toHaveBeenCalledWith(['home']);
  });

  it('submit-button resets the form', () => {
    component.onSubmit();
    expect(component.fbForm.value).toEqual({
      title: null,
      description: null,
      name: null,
      email: null,
      phone: null,
      checkbox: null
    });
  });

  it('should invalidate phone number if it contains letters', () => {
    const phoneInput = fixture.debugElement.query(By.css('input[formControlName="phone"]')).nativeElement;
    phoneInput.value = '123abc456';
    phoneInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const phoneControl = component.fbForm.get('phone');
    expect(phoneControl?.valid).toBeFalse();
  });

  it('should invalidate name if it contains symbols', () => {
    component.ngOnInit(); // Initialize the form
    fixture.detectChanges(); // Trigger change detection

    const nameControl = component.form.get('name');
    nameControl?.setValue('John@');

    expect(nameControl?.valid).toBeFalse();
  });
  
  it('should detect if checkbox is checked', () => {
    component.ngOnInit();
    fixture.detectChanges();

    component.form.get('checkbox')?.setValue(true);
    fixture.detectChanges();

    const checkboxControl = component.form.get('checkbox');
    expect(checkboxControl?.value).toBeTrue();
    expect(checkboxControl?.valid).toBeTrue(); // if using Validators.requiredTrue
  });
});
