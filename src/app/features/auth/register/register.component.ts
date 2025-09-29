import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RegistrationService } from '../../../core/services/registration';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private route: ActivatedRoute, private router: Router) {}

 
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      phone: this.fb.control(''),
      email: this.fb.control('', [Validators.required, Validators.email ]),
      password: this.fb.control('', [Validators.required]),
      userType: this.fb.control(0),
    });

    // Recupere a mensagem de erro da URL
    this.route.queryParams.subscribe(params => {
      this.errorMessage = params['error'] || '';
    });
  }

  register(){
    this.errorMessage = '';
    this.successMessage = '';
    this.registrationService.register(this.registerForm.value.name, this.registerForm.value.phone, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.userType)
      .subscribe({
        next: (data) => {
          if (data.data.error) {
            this.errorMessage = data.data.error;
          } else {
            this.successMessage = data.data.message;
            // Redireciona para login com mensagem de sucesso
            this.router.navigate(['login'], { 
              queryParams: { success: data.data.message } 
            });
          }
        },
        error: (error) => {
          this.errorMessage = error.error;
          localStorage.removeItem('accessToken');
        }
      });
  }
}