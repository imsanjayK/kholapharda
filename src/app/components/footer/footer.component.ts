import { Component, OnInit } from '@angular/core';
import { AppConfig, AppConfigService } from '../../services/app-config.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  config: AppConfig | null = null;

  constructor(private appConfigService: AppConfigService) {}

  ngOnInit(){
    this.appConfigService.loadConfig().subscribe(config => {
      // console.log(config.version)
      // this.appConfigService.setConfig(config);
      this.config = config;
    });
  }

}