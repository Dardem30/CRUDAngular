import {Injectable} from '@angular/core';
import {User} from './app.component';
import {HttpClient} from '@angular/common/http';
import {Headers} from '@angular/http';

@Injectable()
export class AppService {
  constructor(private http:HttpClient) { }
  private userUrl="http://localhost:8080/rest/user";
  private handleError(error: any): Promise<any> {
    console.error('Error', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  create(user:User): Promise<User>{
    return this.http.post(this.userUrl,JSON.stringify(user),{headers:{'Content-Type': 'application/json'}}).toPromise().
    then(response=>response as User).catch(this.handleError);
  }
  getUserById(id:number) {
    return this.http.get("http://localhost:8080/rest/user/"+id);
  }
  getUserList(){
    return this.http.get("http://localhost:8080/rest/users");
  }
  deleteUser(id:number){
    console.log(id);
    this.http.delete("http://localhost:8080/rest/user/"+id,{headers:{'Content-Type': 'application/json'}})
      .subscribe(
      (val) => {
        console.log("DELETE call successful value returned in body",
          val);
      },
      response => {
        console.log("DELETE call in error", response);
      },
      () => {
        console.log("The DELETE observable is now completed.");
      });
  }
  putUser(user:User){
    return this.http.put(this.userUrl,JSON.stringify(user),{headers:{'Content-Type': 'application/json'}}).toPromise().
    then(response=>response as User).catch(this.handleError);
  }
}
