import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import  * as  customValidators  from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public  myForm: FormGroup = this.fb.group({
    name: ['',  [ Validators.required,  Validators.pattern( this.validatorsService.firstNameAndLastnamePattern ) ] ],
    // email: ['',  [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ],  [new  EmailValidator()] ],  //con el segundo validador lo   que hicimos fue indicar que preferimos nuestra opcion de validacion respecto la pre exitente de angular
    email: ['',  [ Validators.required, Validators.pattern( this.validatorsService.emailPattern ) ],  [ this.emailValidator ] ],  //La opcion de arriba hace lo mismo y es mas limpia en general, en el paso de haber muchas inicializaciones, la de arriba paga mas en performace, es decir esta opcion ayuda mas en terminos de performance
    username: ['',  [ Validators.required,  this.validatorsService.cantBeStrider ] ],
    password: ['',  [ Validators.required,  Validators.minLength(6) ] ],
    password2: ['',  [ Validators.required ] ],
  },  {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo( 'pass1',  'pass2' )
    ]
  })

  constructor(
    private fb: FormBuilder,
    private validatorsService:  ValidatorsService,
    private emailValidator: EmailValidator,
  )  {}

  isValidField( field:  string )  {
    return  this.validatorsService.isValidField(  this.myForm,  field  )
  }

  onSubmit()  {
    this.myForm.markAllAsTouched();
  }

}
