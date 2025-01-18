import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { title } from "process";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
    selector:"app-post-create",
    templateUrl:"./post-create.component.html",
    styleUrls:["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
    @Output() postCreated = new EventEmitter<Post>();
    enteredTitle = "";
    enteredContent = "";
    mode = "create";
    private postId: string = "";
    post!: Post;
    isLoading: boolean = false;

    constructor(private ps:PostService, public route:ActivatedRoute){}

    ngOnInit(): void {
        this.route.paramMap.subscribe((res: ParamMap) => { 
            this.mode = res.has('postId') ? 'edit' : 'create'; 
            if (this.mode === 'edit') { 
                this.postId = res.get('postId') ?? '';
                this.isLoading = true;
                this.ps.getPost(this.postId).subscribe(response=>{
                    this.isLoading = false;
                    this.post = {
                        id: response.id,
                        title:response.title,
                        description:response.description
                    }
                });
            } 
        });
    }

    savePost(form:any): void{
        console.log(form);
        if(form.status == "INVALID"){
            return;
        }

        this.isLoading = true;
        if(this.mode == "create"){
            const newPost:Post = {
                id:"",
                title : form.value.title,
                description: form.value.description
            };      

            this.ps.addPost(newPost);
        }
        else{
            const newPost:Post = {
                id:this.postId,
                title : form.value.title,
                description: form.value.description
            };      

            this.ps.updatePost(newPost);
        }
        // this.postCreated.emit(newPost);

        form.resetForm();
    }
    
}