import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService, User } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['user', Validators.required],
    password: ['user123',Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

public user:string ='';

login(form:any){
  let user ={
    username: form.username,
    password:form.password
  }as User
  this.authService.login(user)
  this.authService.saveToken(user.username)
  if(user.username === 'user'){
    this.router.navigate(['/posts-list'])
    this.snackBar.open('¡Welcome!','',{
    duration: 1000
  })
  }
  else{
    this.snackBar.open('¡Username or password invalid!','',{
      duration: 1000
    })
  }
  
}

}
