import { Component, OnInit } from "@angular/core";

@Component({
  selector: "table-bordered",
  templateUrl: "./timetable.component.html",
  styleUrls: ["./timetable.component.scss"]
})
export class TimetableComponent implements OnInit {
  elements: any = [
    {
      id: 1,
      first: "",
      second: "",
      third: "",
      last: "프로그래밍",
      handle: ""
    },
    {
      id: 2,
      first: "",
      second: "웹 보안",
      third: "",
      last: "프로그래밍",
      handle: "해킹바이러스"
    },
    {
      id: 3,
      first: "토익 초급",
      second: "웹 보안",
      third: "",
      last: "프로그래밍",
      handle: "해킹바이러스"
    },
    {
      id: 4,
      first: "토익 초급",
      second: "",
      third: "",
      last: "",
      handle: ""
    },
    {
      id: 5,
      first: "",
      second: "해킹바이러스",
      third: "",
      last: "",
      handle: "웹 보안"
    },
    {
      id: 6,
      first: "암호학 응용",
      second: "해킹바이러스",
      third: "",
      last: "",
      handle: "웹 보안"
    },
    {
      id: 7,
      first: "암호학 응용",
      second: "",
      third: "",
      last: "",
      handle: "정보보호관리"
    },
    {
      id: 8,
      first: "암호학 응용",
      second: "",
      third: "",
      last: "",
      handle: "정보보호관리"
    },
    {
      id: 9,
      first: "",
      second: "",
      third: "",
      last: "",
      handle: "정보보호관리"
    }
  ];

  headElements = [
    "Time",
    "Monday",
    "Tuesday",
    "Wenduesday",
    "Thursday",
    "Friday"
  ];

  constructor() {}

  ngOnInit() {}
}
