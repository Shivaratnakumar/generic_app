import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { subscribeOn, Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";
import { AuthService } from "src/app/auth/auth.service";

@Component({
    selector:"app-post-list",
    templateUrl:"./post-list.component.html",
    styleUrls:["./post-list.component.scss"]
})

export class PostListComponent implements OnInit, OnDestroy {
    posts:Post[] = [];
    private postsSubscription: Subscription = new Subscription;
    private authStatusSubs: Subscription = new Subscription;
    isLoading: boolean = false;
    isAuthenticated:boolean = false;
    totalPosts = 0;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1, 2, 5, 10];
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

    constructor(private ps:PostService, private authService:AuthService){}

    ngOnInit(): void {
        this.isLoading = true;
        this.ps.getPosts(this.postsPerPage,this.currentPage);
        this.postsSubscription = this.ps.getPostUpdatedListener().subscribe((postData: {posts:Post[], postsCount:number})=>{
            this.isLoading = false;
            this.posts = postData.posts;
            this.totalPosts = postData.postsCount
        });
        this.isAuthenticated = this.authService.getIsAuth();
        this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated=>{
            this.isAuthenticated = isAuthenticated;
        });
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.postsSubscription.unsubscribe();
        this.authStatusSubs.unsubscribe();
    }

    deletPost(post:Post){
        this.ps.deletePost(post).subscribe(()=>{
            this.ps.getPosts(this.postsPerPage,this.currentPage);
        });
        // this.ps.getPosts();
    }

    onChangedPage(pageData: PageEvent){
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.ps.getPosts(this.postsPerPage,this.currentPage);
    }

}