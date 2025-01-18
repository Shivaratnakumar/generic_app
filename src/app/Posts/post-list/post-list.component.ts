import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { Subscription } from "rxjs";

@Component({
    selector:"app-post-list",
    templateUrl:"./post-list.component.html",
    styleUrls:["./post-list.component.scss"]
})

export class PostListComponent implements OnInit, OnDestroy {
    posts:Post[] = [];
    private postsSubscription: Subscription = new Subscription;
    isLoading: boolean = false;
    // @Input() posts:Post[] = [];    
    // posts = [
    //     {
    //         title: "First Post",
    //         description: "This is first post"
    //     },
    //     {
    //         title: "Second Post",
    //         description: "This is Second post"
    //     },
    //     {
    //         title: "Thord Post",
    //         description: "This is third post"
    //     }
    // ];

    constructor(private ps:PostService){}

    ngOnInit(): void {
        this.isLoading = true;
        this.ps.getPosts();
        this.postsSubscription = this.ps.getPostUpdatedListener().subscribe((posts:Post[])=>{
            this.isLoading = false;
            this.posts = posts;
        })
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.postsSubscription.unsubscribe();
    }

    deletPost(post:Post){
        this.ps.deletePost(post);
        // this.ps.getPosts();
    }

}