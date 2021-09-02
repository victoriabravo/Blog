import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Comments } from '../class/data';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  comments?: Observable<any>;
  postDetail:any;
  id:any;
  new?: Observable<any>;
  body:String | undefined;
  title: String | undefined;
  emailFormat = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";

  messageForm: FormGroup = this.fb.group({
    title:['',Validators.required],
    email:['',Validators.compose([Validators.required, Validators.pattern(this.emailFormat)])],
    text: ['', Validators.required],
  })

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute=()=> false
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.dataService.getPost().subscribe(x=>{
      this.postDetail =x
    })
    
    this.comments = this.dataService.getComment()
  }

  
  post(form:any){
    let com ={
      id: undefined,
      postId: this.id,
      name:form.title,
      email:form.email,
      body:form.text
    } as Comments
    
    this.dataService.postComment(com).subscribe(x=>{
      this.new=x
      console.log(this.new)
      this.body = JSON.stringify(x.body)
      this.title = JSON.stringify(x.name)
      this.snackBar.open('Comment posted successfully','Ok',{
        duration: 1000
      })
      this.messageForm.reset();
    })
    

}

}
