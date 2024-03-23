
import { Component, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { HibeatService } from 'app/shared/services/hibeat/hibeat.service';
import mp3Slice from 'mp3-slice';

import Swal from 'sweetalert2'

@Component({
  selector: 'hibeats-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Output() loadFile: EventEmitter<File | null> = new EventEmitter<File | null>();
  @ViewChild('inputfile') inputfile: ElementRef;

  showModal = false;
  titleModal = '';
  textModal = '';
  textCopyright = '';

  maxTime = 5;
  allowedFormats = '.mp3';

  fileTmp: any = {};
  ficherovalido: boolean = false;

  temporalAudio = new Audio();
  isPlaying = false;

  fileName = '';
  acceptTerms = false;
  constructor(private hibeatService: HibeatService) { }

  downloadAudio(convertedAudioDataObj: any) {
    const a = document.createElement('a');
    a.href = convertedAudioDataObj.data;
    a.download = convertedAudioDataObj.name + '.' + convertedAudioDataObj.format;
    a.click();
  }

  async getFile($event: any): Promise<void> {
    const [file] = $event.target.files;
    if (!file) {
      return;
    }

    let blob;
    let fileSize;
    const fileFormat = 'audio/mpeg';
    //if (file.type === 'audio/wav') {
    const fileConvertedDataUrl = await this.hibeatService.convertAudioFile(file, fileFormat.split('/')[1]);
    const convertedBlob = await (await fetch(fileConvertedDataUrl.data)).blob();
    const convertedBlobFile = new File([convertedBlob], file.name.split('/')[0], { type: fileFormat });
    // eslint-disable-next-line prefer-const
    fileSize = convertedBlobFile.size;
    //blob = new Blob([convertedBlobFile], { type: fileFormat });
    // eslint-disable-next-line prefer-const
    blob = await mp3Slice.trim(convertedBlobFile, 20, 50);
    // } else {
    //   blob = new Blob([file], { type: fileFormat });
    //   fileSize = file.size;
    // }

    //const initByte = Math.round((fileSize * 30) / 100);
    //let newBlob = new Blob([blob.slice(0, 10000000)], { type: fileFormat });
    const newFile = new File([blob], file.name, { type: 'audio/mp3' });

    //const reduceFile = blob.size < 20000000 ? newFile : new File([newBlob], file.name, { type: fileFormat });

    //keep file validation

    // setTimeout(() => {
    //   const audSrc: string = URL.createObjectURL(file);
    //   this.fileTmp = {
    //     fileRaw: file,
    //     fileName: file.name,
    //     temporalUrl: audSrc,
    //   };
    //   this.temporalAudio.src = audSrc;
    //   this.temporalAudio.load();

    //   this.loadFile.emit(file);
    // }, 3000);

    // this.hibeatService.checkOriginalHibeat(newFile).subscribe({
    //   next: (data) => {
    //     console.log('checker response', data);
    //     this.textCopyright = data.result.title + ' - ' + data.result.subtitle;
    //     if (data.result) {
    //       this.textModal = 'copyright_violation';
    //       this.showModal = true;
    //       this.clearFileSelection();
    //       return;
    //     }
    //     this.handlerAudio(file);
    //   },
    //   error: (error) => {
    //     this.handlerAudio(file);
    //     this.textModal = 'Error Service Validation Copirigth';
    //     this.showModal = true;
    //     //this.clearFileSelection();
    //     console.error(error);
    //     //this.loadFile.emit(null);
    //   },
    // });

    this.fileTmp = {
      fileRaw: file,
      fileName: file.name,
    };

    this.ficherovalido = true;
    this.handlerAudio(file);
  }

  handlerAudio(file: any) {
    const audSrc: string = URL.createObjectURL(this.fileTmp.fileRaw);

    this.fileTmp.temporalUrl = audSrc;
    this.temporalAudio.src = audSrc;
    this.temporalAudio.load();

    this.loadFile.emit(file);
  }

  openFile() {
    // if (!this.acceptTerms) {
    //   this.validTerms();
    //   return;
    // }

    this.inputfile.nativeElement.click();
  }

  clearFileSelection($event?: Event) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.temporalAudio.pause();
    this.fileTmp = {};
    this.ficherovalido = false;
    this.inputfile.nativeElement.value = '';
    this.loadFile.emit(null);
  }

  public togglePlay() {
    if (this.fileTmp.temporalUrl) {
      if (this.isPlaying) {
        this.temporalAudio.pause();
        this.isPlaying = false;
        return;
      }
      this.temporalAudio.load();
      this.temporalAudio.play();
      this.isPlaying = true;
    }
  }

  public stopSong() {
    if (this.isPlaying) {
      this.temporalAudio.pause();
      this.isPlaying = false;
    }
  }

  public getCopyrightStatus() {
    return this.textCopyright;
  }

  public copyrightStatusToBlank() {
    this.textCopyright = '';
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
