import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {

  public dummyData = [
    //TODO replace with firebase data
    {
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus nisl.",
      createAt: new Date(),
      sender: {
        firstName: "Selina",
        lastName: "Meyer",
        photoUrl : "http://via.placeholder.com/50x50"
      }
    },
    {
      message: "Ut etiam sit amet nisl. Nunc sed blandit libero volutpat sed. Tellus in metus vulputate eu. ",
      createAt: new Date(),
      sender: {
        firstName: "Roy",
        lastName: "Weed",
        photoUrl : "http://via.placeholder.com/50x50"
      }
    },    
    {
      message: "Magna fringilla urna porttitor rhoncus dolor purus non enim. Iaculis nunc sed augue lacus viverra vitae congue. ",
      createAt: new Date(),
      sender: {
        firstName: "Mikey",
        lastName: "Miller",
        photoUrl : "http://via.placeholder.com/50x50"
      }
    },
    {
      message: "Purus gravida quis.",
      createAt: new Date(),
      sender: {
        firstName: "Ariana",
        lastName: "Grande",
        photoUrl : "http://via.placeholder.com/50x50"
      }
    },
    {
      message: "At volutpat diam ut venenatis tellus in metus vulputate eu. Viverra nam libero justo laoreet sit amet.",
      createAt: new Date(),
      sender: {
        firstName: "Bob",
        lastName: "Anderson",
        photoUrl : "http://via.placeholder.com/50x50"
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
