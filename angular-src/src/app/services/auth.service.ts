import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User, Login, UserNoPW } from "../models/User";
import { JwtHelperService } from "@auth0/angular-jwt";

// 사용자 등록시, 로그인시 헤더 옵션
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any; // 로그인 성공시 생성되는 토큰 정보
  userNoPW: UserNoPW; // 로그인 성공시 생성되는 사용자 정보
  users: UserNoPW[];

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  prepEndpoint(ep) {
    // 1. localhost에 포팅시
    return "http://localhost:3000/" + ep;

    // 2. Heroku 클라우드 서버에 포팅시
    //return ep;

    // 3. isweb 서버에 포팅시
    //return "http://isweb.joongbu.ac.kr:3000/" + ep;
  }

  registerUser(user): Observable<any> {
    const registerUrl = this.prepEndpoint("users/register");
    return this.http.post<User>(registerUrl, user, httpOptions);
  }

  authenticateUser(login): Observable<any> {
    const loginUrl = this.prepEndpoint("users/authenticate");
    return this.http.post<Login>(loginUrl, login, httpOptions);
  }

  getProfile(): Observable<any> {
    this.authToken = localStorage.getItem("id_token");

    // 토큰을 포함한 헤더 옵션 생성
    const httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: this.authToken
      })
    };

    const profileUrl = this.prepEndpoint("users/profile");
    return this.http.get(profileUrl, httpOptions1);
  }

  getList(): Observable<any> {
    const listUrl = this.prepEndpoint("users/list");
    return this.http.get(listUrl, httpOptions);
  }

  storeUserData(token, userNoPW) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(userNoPW));
    this.authToken = token;
    this.userNoPW = userNoPW;
  }

  logout() {
    this.authToken = null;
    this.userNoPW = null;
    localStorage.clear();
  }

  loggedIn() {
    return !this.jwtHelper.isTokenExpired(this.authToken);
  }
}
