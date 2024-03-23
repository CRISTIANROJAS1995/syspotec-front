
import { ReactionDto } from './../../../core/models/reaction.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { UserService } from '../user/user.service';
import { HiBeatDto } from 'app/core/models/hi-beat.dto';
import { HibeatStatus } from 'app/core/enums/hibeat-status.enum';


const RAPID_API_KEY = environment.RAPID_API_KEY;

@Injectable({
  providedIn: 'root',
})
export class HibeatService {
  hiBeatbaseUrl = `${environment.api}/hibeat`;
  reactionBaseUrl = `${environment.api}/reaction`;
  constructor(private http: HttpClient, private userService: UserService) { }

  getMyHibeats(): Observable<HiBeatDto[]> {
    return this.http.get<HiBeatDto[]>(`${this.hiBeatbaseUrl}`);
  }

  createHiBeat(hiBeat: HiBeatDto, copyright: string): Observable<HiBeatDto> {
    // eslint-disable-next-line eqeqeq
    if (copyright != '') {
      hiBeat.reasonDenied = 'CopyRight';
      hiBeat.reasonDescriptionDenied = copyright;
    }
    hiBeat.owner = `${this.userService.currentUser.pk}`.split('#')[1];
    hiBeat.identityID = this.userService.currentUser.identityID;
    hiBeat.artist = this.userService.currentUser.artistName;
    hiBeat.timestampCreated = Date.now();
    hiBeat.timestampUpdated = Date.now();
    hiBeat.title = hiBeat.title.charAt(0).toUpperCase() + hiBeat.title.slice(1).toLocaleLowerCase();

    //REMOVE AFTER TESTING
    hiBeat.status = HibeatStatus.OK;
    //REMOVE AFTER TESTING

    return this.http.post<HiBeatDto>(this.hiBeatbaseUrl, hiBeat);
  }

  updateHiBeat(hiBeat: HiBeatDto): Observable<HiBeatDto> {
    hiBeat.timestampUpdated = Date.now();
    hiBeat.version = hiBeat.version + 1;
    hiBeat.title = hiBeat.title.charAt(0).toUpperCase() + hiBeat.title.slice(1).toLocaleLowerCase();
    return this.http.put<HiBeatDto>(`${this.hiBeatbaseUrl}`, hiBeat);
  }

  removeHiBeat(hiBeat: HiBeatDto): Observable<void> {
    return this.http.delete<void>(`${this.hiBeatbaseUrl}`, { body: hiBeat });
  }

  getReactions(hibeatId: string): Observable<ReactionDto[]> {
    return this.http.get<ReactionDto[]>(`${this.reactionBaseUrl}/${hibeatId}`);
  }

  checkOriginalHibeat(file: File): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-RapidAPI-Key', RAPID_API_KEY)
      .set('X-RapidAPI-Host', 'shazam-song-recognizer.p.rapidapi.com');

    const formData = new FormData();

    formData.append('upload_file', file);

    return this.http.post<any>('https://shazam-song-recognizer.p.rapidapi.com/recognize', formData, { headers });
  }

  getBlobFromBase64Data(b64Data: any, contentType: any, sliceSize = 512): any {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  async convertAudioFile(audioFileData: any, targetFormat: any): Promise<any> {
    try {
      targetFormat = targetFormat.toLowerCase();
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (e: any) => {
          const contentType = 'audio/' + targetFormat;
          const data = e.target.result.split(',');
          const b64Data = data[1];
          const blob = this.getBlobFromBase64Data(b64Data, contentType);
          const blobUrl = URL.createObjectURL(blob);

          const convertedAudio = {
            name: audioFileData.name.substring(0, audioFileData.name.lastIndexOf('.')),
            format: targetFormat,
            data: blobUrl,
          };
          resolve(convertedAudio);
        };
        reader.readAsDataURL(audioFileData);
      });
    } catch (e) {
      console.log('Error occurred while converting : ', e);
    }
  }
}
