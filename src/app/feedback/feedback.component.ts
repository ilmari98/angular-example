import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent implements OnInit {
  fb!: FormGroup;
  form!: FormGroup;
  feedbackForm: any;
  submit() {
    throw new Error('Method not implemented.');
  }
  headerText: string = "Give feedback";

  fbForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')]),
    description: new FormControl('', [Validators.required, Validators.minLength(2)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z ]*$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    checkbox: new FormControl('')
  });
  
  constructor(public router: Router) {}

  ngOnInit(): void {
    agree: new FormControl(false, Validators.requiredTrue)
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z ]*$")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      message: new FormControl('', [Validators.required, Validators.minLength(10)]),
      checkbox: new FormControl(false, Validators.requiredTrue)
    });
  }

  cancel() {
    this.router.navigate(['home']);
  }

  onSubmit() {
    this.fbForm.reset();
    this.fbForm.controls['title'].setErrors(null);
    this.fbForm.controls['description'].setErrors(null);
    this.fbForm.controls['name'].setErrors(null);
    this.fbForm.controls['email'].setErrors(null);
    this.fbForm.controls['phone'].setErrors(null);
  }

  get title() {
    return this.fbForm.get('title');
  }

  get description() {
    return this.fbForm.get('description');
  }

  get name() {
    return this.fbForm.get('name');
  }

  get email() {
    return this.fbForm.get('email');
  }

  get phone() {
    return this.fbForm.get('phone');
  }

  get checkbox() {
    return this.fbForm.get('checkbox');
  }
}
