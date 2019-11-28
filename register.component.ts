import { Component, OnInit } from "@angular/core";
import { ValidateService } from "../../services/validate.service";
import { AuthService } from "../../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  userid: string;
  username: string;
  email: string;
  phone: number;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() { }

  onRegisterSubmit() {
    // UI 에서 입력한 사용자 등록정보를 이용하여 user 객체 생성
    const user = {
      userid: this.userid,
      username: this.username,
      email: this.email,
      phone: this.phone,
      password: this.password
    };

    // 모든 필드 입력 검사
    if (!this.validateService.validateRegister(user)) {
      console.log("모든 필드들을 채워주세요...");
      this.flashMessage.show("빈칸없이 입력해주세요.", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }

    // 이메일 주소 유효성 검사
    if (!this.validateService.validateEmail(user.email)) {
      console.log("유효한 이메일주소를 입력하세요...");
      this.flashMessage.show("유효한 이메일주소를 입력하세요", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }

    // Register User 사용자 등록
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["/login"]);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: "alert-danger",
          timeout: 3000
        });
        this.router.navigate(["/register"]);
      }
    });
  }
}
