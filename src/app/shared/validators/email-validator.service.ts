import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailValidator implements  AsyncValidator {

  validate( control: AbstractControl  ): Observable<ValidationErrors | null> {

    const email = control.value;

    const httpCallObservable  = new Observable<ValidationErrors | null>(  ( subscriber  ) =>  {

      console.log({ email });

      if  ( email === 'rodrigo@google.com' )  {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        //return; //este es opcional pero no quita ni aporta funcionalidad
      }

      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay(  3000  )
    );

    return  httpCallObservable;


  }

/////////// Version princiciantes
  // validate( control: AbstractControl  ): Observable<ValidationErrors | null> {

  //   const email = control.value;
  //   console.log({ email });

  //   return  of({
  //     emailTaken: true
  //   }).pipe(
  //     delay(  2000  )
  //   );

  // }




}
