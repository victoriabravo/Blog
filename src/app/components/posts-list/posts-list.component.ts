import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {


  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
  
posts: Observable<any> | undefined

  ngOnInit(): void {
   this.posts = this.dataService.getAllPosts()
  }

  show(id:number){
    this.router.navigate(['post-detail',id])
    
  }

}
