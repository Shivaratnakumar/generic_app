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

    private postsUpdated = new Subject<{posts: Post[],postsCount:number}>()


    constructor(private http:HttpClient, private router:Router){}

    // getPosts(): Post[] {
    //     //spread operator -> create a new array instead old
    //     return [...this.posts];
    // }

    getPosts(postsPerPage:number, currentPage:number) {
        const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
        this.http.get<{Status:string, posts: any, maxPosts:number}>('http://localhost:3000/api/posts' + queryParams).pipe(map((response)=> {
            console.log("reps",response)
            return { posts : response.posts.map((post:any)=>{
                return {
                    title: post.title,
                    description: post.description,
                    id: post._id,
                    imagePath: post.imagePath,
                    creator: post.creator
                }
            }),maxPosts:response.maxPosts}
        })).subscribe((trnsformedData)=>{
            this.posts = trnsformedData.posts;
            this.postsUpdated.next({posts : [...this.posts], postsCount:trnsformedData.maxPosts});
        });
    }

    addPost(post:any){
        
        this.http.post<{Status:string,postId:string, post:Post}>('http://localhost:3000/api/posts',post).subscribe((response)=>{
            this.router.navigate(['/']);
        });
    }

    updatePost(post:Post){
        console.log("PUT::",post)
        this.http.put<{Status:string,postId:string}>('http://localhost:3000/api/posts/' + post.id, post).subscribe((response)=>{
            this.router.navigate(['/']);
        });
    }

    getPostUpdatedListener(){
        return this.postsUpdated.asObservable();
    }

    deletePost(deletepost:Post): Observable<any> {
        return this.http.delete<{Status: string}>(`http://localhost:3000/api/posts/${deletepost.id}`)

    }

    getPost(id:string){
        // return {...this.posts.find(p=> p.id === id)};
        return this.http.get<{Status:string,id:string,title:string,description:string}>(`http://localhost:3000/api/posts/${id}`);
    }
}