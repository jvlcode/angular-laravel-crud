import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  posts:Post[]=[];
  constructor(public postService:PostService) { }

  ngOnInit(): void {
    this.postService.getAll().subscribe((data:Post[])=>{
      this.posts = data;
      console.log(this.posts);

    })
  }

  deletePost(id:number)
  {
    this.postService.delete(id).subscribe(res=>{
      this.posts = this.posts.filter(item=>item.id!==id);
      console.log('Post Deleted successfully!');

    })

  }

}
