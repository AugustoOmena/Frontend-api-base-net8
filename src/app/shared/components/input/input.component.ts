import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label!: string
  @Input() errorMessage!: string
  @Input() showTip: boolean = true

  input: any

  @ContentChild(NgModel) model!: NgModel;
  @ContentChild(FormControlName) control!: FormControlName


  ngOnInit(): void {
  }
  ngAfterContentInit(): void {
    this.input = this.model || this.control
    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName')
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && this.input.dirty && this.input.touched;
  }
  
  hasError(): boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched);
  }
}
