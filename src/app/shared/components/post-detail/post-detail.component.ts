import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {


  @Input() post!: Post;
  @Input() isNew!: boolean;
  selectedImage: string = '';

  constructor() {
  }

  ngOnInit() {
    this.selectedImage = this.post.images[0]
  }

}
