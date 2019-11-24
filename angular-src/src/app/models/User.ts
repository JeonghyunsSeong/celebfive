// 사용자 등록시 서버에 전송하는 정보의 데이터 모델.
export class User {
  name: string;
  email: string;
  username: string;
  password: string;
  phone: number;
}

// 로그인시 서버에 보내는 정보의 데이터 모델
export class Login {
  username: string;
  password: string;
}

// 로그인된 사용자의 데이터 모델.
// 패스워드 정보는 보안을 위해 삭제하고 사용함.
export class UserNoPW {
  name: string;
  email: string;
  username: string;
  phone: number;
}
