import { Component, OnInit } from '@angular/core';
import { User} from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user : User =new User();
  submitted = false;
  pipe = new DatePipe('en-US');
  constructor(private userservice:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.submitted = false;
  }

  usersaveform = new FormGroup({
    firstName:new FormControl('',[Validators.required]),
    lastName:new FormControl('',[Validators.required]),
    dateOfBirth:new FormControl('',[Validators.required]),
    joiningDate:new FormControl('',[Validators.required]),
    pincode:new FormControl('',[Validators.required , Validators.minLength(6)]),
    cvoid:new FormControl()
  });

  get UserFirstName(){  
    return this.usersaveform.get('firstName');  
  } 

  get UserLastName(){  
    return this.usersaveform.get('lastName');
  } 

  get UserDOB(){  
    return this.usersaveform.get('dateOfBirth');
  } 

  get UserJoiningDate(){  
    return this.usersaveform.get('joiningDate');
  }

  get UserPincode(){  
    return this.usersaveform.get('pincode');
  }

  onSubmit() {
    this.user=new User();
    this.user.firstName=this.UserFirstName?.value;
    this.user.lastName=this.UserLastName?.value;
    
    let  dateOfBirth = this.pipe.transform(this.UserDOB?.value, 'dd-MM-yyyy');
    this.user.dateOfBirth=dateOfBirth!;
    console.log("Date of Birth : "+this.user.dateOfBirth);
    
    let  joiningDate = this.pipe.transform(this.UserJoiningDate?.value, 'dd-MM-yyyy');
    this.user.joiningDate =joiningDate!;
    console.log("Joining Date : "+this.user.joiningDate);
    
    this.user.pincode=this.UserPincode?.value;
    this.user.cvoid=1;
    this.submitted = true;
    this.save();
  }

  addUserForm(){
    this.submitted=false;
    this.usersaveform.reset();
    this.user = new User();
    this.gotoList();
  }

  save(){
    this.userservice.addUser(this.user).subscribe(
      data => console.log(data),
      error => console.log(error));
      this.user =new User();
      this.router.navigate(['/view-user']);
      this.gotoList();
  }
  gotoList() {
    this.router.navigate(['/view-user']);
  }

}
