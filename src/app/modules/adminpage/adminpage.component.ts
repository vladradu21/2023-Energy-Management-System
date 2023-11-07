import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  users : any;
  selectedUser : any;

  editUserModal:any;
  deleteUserModal:any;

  ngOnInit() {
    this.getAllUsers();

    this.editUserModal = new window.bootstrap.Modal(
      document.getElementById('editUserModal'),
    )

    this.deleteUserModal = new window.bootstrap.Modal(
      document.getElementById("deleteUserModal")
    );
  }

  constructor(private userService : UserService) {}

  getAllUsers() {
    this.userService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.users = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUserByUsername(username : string) {
    this.userService.getByUsername(username).subscribe(
      (data) => {
        console.log(data);
        this.selectedUser = data;
      }
    );
  }

  updateUser(user : any) {
    this.userService.update(user).subscribe(
      (data) => {
        console.log(data);
        this.getAllUsers();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUser(username : string) {
    this.userService.delete(username).subscribe(
      (data) => {
        console.log(data);
        this.getAllUsers();
      },
      (error) => {
        console.log(error);
      }
    )

    // this.userService.removeUserDeviceMicroservice(username).subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // )
  }

  openEditUserModal(username : string) {
    this.editUserModal?.show();
    this.selectedUser = this.getUserByUsername(username);
  }

  closeEditUserModal() {
    this.editUserModal?.hide();
  }

  saveEditUserModal() {
    this.editUserModal?.hide();
    this.updateUser(this.selectedUser);
  }

  openDeleteUserModal(username : string){
    this.deleteUserModal?.show();
    this.selectedUser = this.getUserByUsername(username);
  }

  closeDeleteUserModal(){
    this.deleteUserModal?.hide();
  }

  confirmDeleteUserModal(){
    this.deleteUser(this.selectedUser.username);
    this.closeDeleteUserModal();
  }
}
