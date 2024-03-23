import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { debug } from 'console';

import Swal from 'sweetalert2'
@Component({
  selector: 'hibeats-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss'],
})
export class VideoUploadComponent {
  @Input() urlImage: string;
  @Output() loadFile: EventEmitter<File | null> = new EventEmitter<File | null>();
  @ViewChild('inputfile', { static: false }) inputfile: ElementRef;

  fileTmp: any = {};

  showModal = false;
  titleModal = '';
  textModal = '';

  loadingCover = false;
  acceptTerms = false;
  allowedFormats = '/.Mp4';
  ratio = '1:1';
  dimensions = '3000x3000';


  openFile() {
    // if (!this.acceptTerms) {
    //   this.validTerms();
    //   return;
    // }

    this.inputfile.nativeElement.click();
  }

  onSelectFile(e: any) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.loadingCover = true;
        setTimeout(() => {
          this.fileTmp = {
            name: event.target.result,
            fileRaw: e.target.files[0],
          };
          this.loadFile.emit(this.fileTmp.fileRaw);
          this.loadingCover = false;
        }, 1500);
      };
    }
  }

  clearCurrentImage($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.urlImage = '';
    this.inputfile.nativeElement.value = null;
    this.fileTmp = {};

    this.loadFile.emit(null);
    this.loadingCover = false;
  }

  selectNewOne($event: Event) {
    this.clearCurrentImage($event);
    this.openFile();
  }

  validTerms(){
    Swal.fire({
        title: 'Ups...',
        text: 'You must accept the terms and conditions to continue',
        icon: 'warning',
        confirmButtonColor: '#9333EA',
        confirmButtonText: 'OK'
    });
}
}
