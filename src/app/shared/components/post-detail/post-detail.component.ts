import { Component, OnInit, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {


  @Input() post!: Post;
  @Input() isNew!: boolean;
  selectedImage: string = '';

  constructor(
    public platform: Platform,
    private utilsSvc: UtilsService
  ) {
  }

  ngOnInit() {
    this.selectedImage = this.post.images[0]
  }

}
