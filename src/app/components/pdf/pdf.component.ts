import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PDFDocumentProxy, PDFProgressData, PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { ProgressComponent } from '../progress/progress.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/envirnoment';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [PdfViewerModule, ProgressComponent, CommonModule],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent {
  @ViewChild(PdfViewerComponent) private pdfComponent!: PdfViewerComponent;
  @Output() progressEmit: EventEmitter<number> = new EventEmitter();

  pdfSrc = environment.pdfSrc;
  appconfigPath = 'assets/appconfig.json';

  pageNumber = 1;
  totalPages = 0;
  zoom = 1.0;

  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.totalPages = pdf.numPages;
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
    }
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
    }
  }

  zoomIn() {
    this.zoom += 0.1;
  }

  zoomOut() {
    if (this.zoom > 0.1) {
      this.zoom -= 0.1;
    }
  }

  size = true;
  fit = true;

  pageFit() {
    this.zoom = 1.0;
    this.fit = true;
    this.size = true;
  }

  onPageChange(event: any) {
    this.pageNumber = event.pageNumber;
    console.log(this.pageNumber)
  }

  downloadPdf() {
    const link = document.createElement('a');
    link.href = this.pdfSrc;
    link.download = this.pdfSrc.split('/').pop() || 'download.pdf';
    link.click();
  }

  onPagesLoaded(event: any) {
    this.totalPages = event.pagesCount;
  }

  currentProgress = 0;
  displayHeader = 'flex';
  display = 'Hidden'
  progress = 'visible';

  onProgress(progressData: PDFProgressData) {
    this.currentProgress = progressData.loaded / progressData.total * 100;
    var num = Number((this.currentProgress).toFixed(0));

    this.progressEmit.emit(num);
    if (this.currentProgress == 100) {
      this.display = 'visible';
      this.progress = 'Hidden';
      this.isFullWidth = false;

    }
  }

  isFullWidth: boolean = true; // Change this to control width

  closeNav() {
    this.isFullWidth = !this.isFullWidth;
  }
}