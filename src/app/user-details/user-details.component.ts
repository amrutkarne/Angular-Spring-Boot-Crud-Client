import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserListComponent } from '../user-list/user-list.component';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: number;
  user: User;

  constructor(private userservice:UserService, private route: ActivatedRoute,
     private router: Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.id = this.route.snapshot.params['id'];
    this.userservice.getUser(this.id).subscribe(
      data => {
        console.log(data);
        this.user = data;
      }, error => console.log(error)
    );
  }

  getUserList(){
    this.router.navigate(['view-user']);
  }

  updateUser(id : number){
    this.router.navigate(['update-usr',id]);
  }

}
