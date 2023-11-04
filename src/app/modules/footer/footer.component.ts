import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    bootstrap: any;
  }
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  aboutUsModal: any;

  ngOnInit(): void {
    this.aboutUsModal = new window.bootstrap.Modal(
      document.getElementById('aboutUsModal')
    );
  }

  openAboutUsModal() {
    this.aboutUsModal?.show();
  }

  closeAboutUsModal() {
    this.aboutUsModal?.hide();
  }
}
