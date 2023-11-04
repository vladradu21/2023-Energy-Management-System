import {Component, OnInit} from '@angular/core';
import {DeviceService} from 'src/app/service/device.service';
import {UserService} from 'src/app/service/user.service';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  user: any = {};
  devices : any;
  selectedDevice : any;
  newDevice: any = {};

  addDeviceModal: any;
  editDeviceModal: any;
  deleteDeviceModal: any;

  ngOnInit() {
    this.getUser();
    this.getUserDevices();

    this.addDeviceModal = new window.bootstrap.Modal(
      document.getElementById('addDeviceModal'),
    )

    this.editDeviceModal = new window.bootstrap.Modal(
      document.getElementById('editDeviceModal'),
    )

    this.deleteDeviceModal = new window.bootstrap.Modal(
      document.getElementById("deleteDeviceModal")
    );
  }

  constructor(private deviceService: DeviceService,
              private userService: UserService) {}

  getUser() {
    const username = localStorage.getItem('username') || '';
    this.userService.getByUsername(username).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
      }
    );
  }

  getUserDevices() {
    this.deviceService.getAll().subscribe(
      (data) => {
        console.log(data);
        this.devices = data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getDeviceByName(deviceName: string) {
    this.deviceService.getByName(deviceName).subscribe(
      (data) => {
        console.log(data);
        this.selectedDevice = data;
      }
    );
  }

  updateDevice(device: any) {
    this.deviceService.update(device).subscribe(
      (data) => {
        console.log(data);
        this.getUserDevices();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteDevice(deviceName: string) {
    this.deviceService.delete(deviceName).subscribe(
      (data) => {
        console.log(data);
        this.getUserDevices();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addDevice() {
    this.deviceService.create(this.newDevice).subscribe(
      (data) => {
        console.log(data);
        this.getUserDevices();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openEditDeviceModal(deviceName: string) {
    this.editDeviceModal?.show();
    this.selectedDevice = this.getDeviceByName(deviceName);
  }

  closeEditDeviceModal() {
    this.editDeviceModal?.hide();
  }

  saveEditDeviceModal() {
    this.editDeviceModal?.hide();
    this.updateDevice(this.selectedDevice);
  }

  openDeleteDeviceModal(deviceName: string) {
    this.deleteDeviceModal?.show();
    this.selectedDevice = this.getDeviceByName(deviceName);
  }

  closeDeleteDeviceModal() {
    this.deleteDeviceModal?.hide();
  }

  confirmDeleteDeviceModal() {
    this.deleteDevice(this.selectedDevice.name);
    this.closeDeleteDeviceModal();
  }

  openAddDeviceModal() {
    this.addDeviceModal?.show();
  }

  closeAddDeviceModal() {
    this.addDeviceModal?.hide();
  }

  confirmAddDeviceModal() {
    this.addDevice();
    this.closeAddDeviceModal();
  }

}
