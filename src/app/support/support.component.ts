import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../login/login.service';
import { UserRole } from '../utilities/user/user-role.enum';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent {
  supportForm: FormGroup = new FormGroup([]);

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.supportForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });

    this.loginService.currentUser.subscribe({
      next: (user) => {
        if (user.id > 0) {
          const nameField = this.supportForm.get('name');
          nameField?.setValue(user.name);
          if (user.role !== UserRole.MANAGER) {
            nameField?.disable();
          }
        }
      }
    })
  }

  onSubmit() {
    if (this.supportForm.valid) {
      const { name, email, subject, message } = this.supportForm.value;
      // Submit the form data to your backend (replace with your logic)
      console.log(`Name: ${name}, Email: ${email}, Subject: ${subject}, Message: ${message}`);
      this.supportForm.reset(); // Reset the form after submission
    }
  }
}
