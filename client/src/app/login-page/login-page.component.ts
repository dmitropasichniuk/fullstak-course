import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../shared/services/auht.service'
import {Subscription} from 'rxjs'
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MaterialServise} from '../shared/classes/material.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSab: Subscription

  constructor(private auth: AuthService,  
              private router: Router,
              private route: ActivatedRoute) { 

}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    this.route.queryParams.subscribe((params:Params) => {
      if (params['registered']){
        MaterialServise.toast('Теперь вы можете войти в систему используя свои даные')
      }else if (params['accsesDenied']){
        MaterialServise.toast('Для начала авторизуйтесь в системе ')
      }else if (params['sessionFailed']){
        MaterialServise.toast('Пожалуйста войдите в систему заного')
      }
    })
  }

  ngOnDestroy() {
    if(this.aSab){
      this.aSab.unsubscribe()
    }
    
  }

  onSubmit(){
    this.form.disable()
    this.aSab = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterialServise.toast(error.error.message)
        this.form.enable() 
      }
      
    ) 
  }

}
