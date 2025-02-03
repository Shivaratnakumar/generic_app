import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { title } from "process";
import { Post } from "../post.model";
import { PostService } from "../post.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { mimeType } from './mime-type.validator';
import { FileValidationService } from './validation.service';

@Component({
    selector:"app-post-create",
    templateUrl:"./post-create.component.html",
    styleUrls:["./post-create.component.scss"]
})
export class PostCreateComponent implements OnInit {
    form!: FormGroup;
    @Output() postCreated = new EventEmitter<Post>();
    enteredTitle = "";
    enteredContent = "";
    mode = "create";
    private postId: string = "";
    post!: Post;
    isLoading: boolean = false;
    imagePreview: string | ArrayBuffer | null | undefined;

    constructor(
        private ps:PostService, 
        public route:ActivatedRoute,
        public fb: FormBuilder,
        private fileValidationService: FileValidationService
    ){}

    ngOnInit(): void {
        this.form = this.fb.group({ 
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', Validators.required],
            image: ['', {
                validators: [Validators.required],
                asyncValidators: [mimeType(this.fileValidationService)],
                updateOn: 'change' // Ensure the validator runs on change
            }]
        });

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

                    this.form.get('title')?.setValue(response.title);
                    this.form.get('description')?.setValue(response.description);
                });

                
            } 
        });
    }

    savePost(): void{
        console.log(this.form);
        if(this.form.status == "INVALID"){
            return;
        }

        const postData = new FormData();

        

        this.isLoading = true;
        if(this.mode == "create"){
            // const newPost:Post = {
            //     id:"",
            //     title : this.form.value.title,
            //     description: this.form.value.description
            // };      

            // this.ps.addPost(newPost);
            postData.append("title",this.form.value.title);
            postData.append("description",this.form.value.description);
            postData.append("image",this.form.get('image')?.value, this.form.value.title);
            this.ps.addPost(postData);
        }
        else{
            const newPost:Post = {
                id:this.postId,
                title : this.form.value.title,
                description: this.form.value.description
            };      

            this.ps.updatePost(newPost);
        }
        // this.postCreated.emit(newPost);

        this.form.reset();
    }

    onImagePicked(event: any){
        
        const file = (event.target as HTMLInputElement)?.files?.[0];
        if(file){
            this.form.patchValue({image:file});
            this.form.get('image')?.updateValueAndValidity({ onlySelf: true });

            const reader = new FileReader(); 
            reader.onload = () => { 
                this.imagePreview = reader.result; 
            }; 
            reader.readAsDataURL(file);
        }
    }
    
}