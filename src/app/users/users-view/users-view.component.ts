import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../users.service';

interface DeleteResponse {
  success: boolean;
  user: {};
}

interface messageResponse {
  success: boolean;
  message: ''
}

@Component({
  selector: 'app-users-view',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss'
})


export class UsersViewComponent implements OnInit {
  users: any = [];
  user: any = {};
  newUser: any = {
    name: '',
    password: '',
    type: ''
  };
  deletedUser: any = {};
  message: any = '';


  constructor(private http: HttpClient, private usr: UsersService) { }

  ngOnInit(): void {
    this.getUsers()
    console.log(this.deletedUser);

  }

  getUsers() {
    this.usr.fetchUsers().subscribe(
      (data: any) => {
        this.users = data.users;
        console.log('Users:', this.users);
      });
  }

  //create a new user
  addUser() {
    this.http.post<messageResponse>('http://127.0.0.1:8000/api/user', this.newUser)
      .subscribe((message: messageResponse) => {
        //refresh the list as new users are added
        console.log(this.newUser);
        this.message = message.message
        console.log(this.message);
        this.getUsers()
      })
  }

  //delete user
  deleteUser(id: number) {

    //get the user before deleting
    this.http.get<DeleteResponse>('http://127.0.0.1:8000/api/user/' + id)
      .subscribe((deleted: DeleteResponse) => {
        this.deletedUser = deleted.user
        console.log(this.deletedUser);
        //now delete user
        this.http.delete('http://127.0.0.1:8000/api/user/' + id)
          .subscribe((response) => {
            this.getUsers()
          })
      })

    this.deletedUser = {}

  }
}
