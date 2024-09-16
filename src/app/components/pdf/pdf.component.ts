import { Component, OnInit, ViewChild } from '@angular/core';
import { PDFDocumentProxy, PDFProgressData, PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { ProgressComponent } from '../progress/progress.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf',
  standalone: true,
  imports: [PdfViewerModule, ProgressComponent, CommonModule],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent implements OnInit {
  @ViewChild(PdfViewerComponent) private pdfComponent!: PdfViewerComponent;
  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  pdfSrc = '/assets/Kholapharda.pdf';
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

  size =true;
  fit =true;
  pageFit(){
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

  printPdf() {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.src = this.pdfSrc;
    iframe.onload = () => {
      setTimeout(() => {
        iframe.contentWindow?.print();
        document.body.removeChild(iframe);
      }, 1);
    };
    document.body.appendChild(iframe);
  }

  onPagesLoaded(event: any) {
    this.totalPages = event.pagesCount;
  }

  currentProgress= 0;
  displayHeader = 'flex';
  display = 'Hidden'

  onProgress(progressData: PDFProgressData) {
    this.currentProgress = progressData.loaded/progressData.total*100;
    if(this.currentProgress == 100){
      this.display = 'visible'
    }
  }
}
