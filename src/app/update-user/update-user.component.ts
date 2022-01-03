import { Component, OnInit, Input } from '@angular/core';
import { User} from '../user';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserListComponent } from '../user-list/user-list.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  user :User;
  submitted=false;
  pipe = new DatePipe('en-US');
  constructor(private route: ActivatedRoute,private router: Router,private userservice : UserService) { }

  ngOnInit(): void {
    this.user=new User();
    this.id = this.route.snapshot.params['id'];
    this.userservice.getUser(this.id).subscribe(
      data => {
        console.log(data);
        //data.dateOfBirth=this.pipe.transform(data.dateOfBirth, 'yyyy-MM-dd');
       // data.dateOfBirth= this.pipe.transform(data.dateOfBirth.value, 'dd-MM-yyyy');
        this.user = data;       
        console.log("Date of Birth : "+this.user.dateOfBirth);
      },
      error => console.log(error)
    );
  }

  userupdateform = new FormGroup({
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
    dateOfBirth:new FormControl('',[Validators.required]),
    joiningDate:new FormControl('',[Validators.required]),
    pincode:new FormControl('',[Validators.required , Validators.minLength(6)]),
    cvoid:new FormControl()
  });

  get UserFirstName(){  
    return this.userupdateform.get('firstName');  
  } 

  get UserLastName(){  
    return this.userupdateform.get('lastName');
  } 

  get UserDOB(){  
    return this.userupdateform.get('dateOfBirth');
  } 

  get UserJoiningDate(){  
    return this.userupdateform.get('joiningDate');
  }

  get UserPincode(){  
    return this.userupdateform.get('pincode');
  }

  updateUser(){
    this.userservice.updateUser(this.id,this.user).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.user = new User();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.updateUser();    
  }
  gotoList() {
    this.router.navigate(['/view-user']);
  }

  

}


