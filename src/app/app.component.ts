import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
export class User {
  id: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-root',
  template: `
      <form (submit)="create()">
        <input type="text" name="username" [(ngModel)]="user.username">
        <input type="text" name="password" [(ngModel)]="user.password">
        <input type="submit" value="ok">
      </form>
    <div *ngFor="let user of users">{{user.username}}
      <input type="submit" value="delete" (click)="deleteUser(user)"/></div>
      <form (ngSubmit)="getUser(id)">
        <input type="text" name="id" [(ngModel)]="id">
        <input type="submit" value="ok">
      </form>
      {{user1.username}}
      <form (submit)="updateUser()">
        <input type="text" name="id" value="{{user1.id}}" [(ngModel)]="user1.id" readonly="readonly">
        <input type="text" name="username" [(ngModel)]="user1.username">
        <input type="text" name="password" [(ngModel)]="user1.password" >
        <input type="submit" value="ok">
      </form>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users:User[];
  user=new User();
  user1=new User();
  userK=new User();
  constructor(private service:AppService){}
  create(){
    this.service.create(this.user);
  }
  updateUser(){
    console.log(this.user1);
    this.service.putUser(this.user1);
  }
  ngOnInit() {
    this.service.getUserList().subscribe(data => this.users=data as User[]);
  }
  getUser(id: number){
    // console.log(this.user1);
    this.service.getUserById(id).subscribe(data => this.user1=data as User);
    return this.user;
  }
  deleteUser(user:User){
    this.service.deleteUser(user.id);
    console.log(user);
  }
  title = 'app';
}
