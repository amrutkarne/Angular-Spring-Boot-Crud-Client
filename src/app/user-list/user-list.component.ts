import { Component, OnInit } from '@angular/core';
import { User} from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userservice:UserService,
    private router:Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.users=this.userservice.getUserList();
  }

  deleteUser(id : number) {
    this.userservice.deleteUser(id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => console.log(error));
    }

    userDetails(id : number) {
      this.router.navigate(['user-details',id]);
    }
  

}
