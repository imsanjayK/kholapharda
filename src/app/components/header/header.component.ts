import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environment/envirnoment';
import { CommonModule } from '@angular/common';
import { AppConfig, AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  visitorCount!: number;
  isFullWidth: boolean = false;
  display: string = 'none';
  config: AppConfig | null = null;

  currentDateTime: string = '';
  private intervalId: any;

  constructor(private appConfigService: AppConfigService) { }

  ngOnInit(): void {
    this.appConfigService.loadConfig().subscribe(config => {
      // this.config = config;
      // config.visitorCount += 1;
      this.visitorCount = config.visitorCount;
      this.getVistorsCount();
    });

    // this.visitorCount = environment.visitorCount; // page_view config
    // this.visitorCount = Number(this.config?.visitorCount); 
    // page_view config
 

    this.updateDateTime();
    this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000);
  }

  updateDateTime() {
    const now = new Date();
    this.currentDateTime = now.toLocaleString();
  }

  openNavigation() {
    // alert("Page under construction... \nନିର୍ମାଣାଧୀନ ପୃଷ୍ଠା...");
    this.isFullWidth = !this.isFullWidth;
    // this.display = 'block'
  }

  getVistorsCount() {
    let getLocalCount = Number(window.localStorage.getItem("page_view"));
    //console.log("Vistor: "+ this.visitorCount)
    //console.log("Vistor: "+ getLocalCount)

    if (isNaN(Number(getLocalCount))) {
      this.setVistorCount(this.visitorCount);
    }
    else if (this.visitorCount > Number(getLocalCount)) {
      this.setVistorCount(this.visitorCount);
      //console.log(getLocalCount)
    }
    else {
      this.setVistorCount(getLocalCount);
    }
  }

  setVistorCount(visitorCount_ls: number) {
    this.visitorCount = visitorCount_ls + 1;
    window.localStorage.setItem("page_view", this.visitorCount.toString());
  }

  downloadPdf() {
    const link = document.createElement('a');
    link.href = environment.pdfSrc;
    link.download = environment.pdfSrc.split('/').pop() || 'download.pdf';
    link.click();
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to prevent memory leaks
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}