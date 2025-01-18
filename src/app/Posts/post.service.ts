import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";

import { Router } from "@angular/router";

@Injectable({
    providedIn:"root"
})

export class PostService {
    private posts: Post[] = [];

    private postsUpdated = new Subject<Post[]>()


    constructor(private http:HttpClient, private router:Router){}

    // getPosts(): Post[] {
    //     //spread operator -> create a new array instead old
    //     return [...this.posts];
    // }

    getPosts() {
        this.http.get<{Status:string, posts: any}>('http://localhost:3000/api/posts').pipe(map((response)=> {
            return response.posts.map((post:any)=>{
                return {
                    title: post.title,
                    description: post.description,
                    id: post._id
                }
            })
        })).subscribe((posts)=>{
            this.posts = posts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    addPost(post:Post){
        
        this.http.post<{Status:string,postId:string}>('http://localhost:3000/api/posts',post).subscribe((response)=>{
            console.log(response);
            post.id = response.postId;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);

            this.router.navigate(['/']);
        });
    }

    updatePost(post:Post){
        console.log("PUT::",post)
        this.http.put<{Status:string,postId:string}>('http://localhost:3000/api/posts/' + post.id, post).subscribe((response)=>{
            console.log(response);
            const updatePosts = [...this.posts];
            const oldPostIndex = updatePosts.findIndex(p=> p.id == response.postId);
            updatePosts[oldPostIndex] = post;
            this.posts = updatePosts;
            this.postsUpdated.next([...this.posts]);
            this.router.navigate(['/']);
            // post.id = response. postId;
            // this.posts.push(post);
            // this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdatedListener(){
        return this.postsUpdated.asObservable();
    }

    deletePost(deletepost:Post){
        this.http.delete<{Status: string}>(`http://localhost:3000/api/posts/${deletepost.id}`).subscribe((response)=>{
            const updatedPosts = this.posts.filter(post => post.id != deletepost.id);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        })

    }

    getPost(id:string){
        // return {...this.posts.find(p=> p.id === id)};
        return this.http.get<{Status:string,id:string,title:string,description:string}>(`http://localhost:3000/api/posts/${id}`);
    }
}