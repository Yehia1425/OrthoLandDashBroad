import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
    private http = inject(HttpClient);

  baseUrl = 'https://ourtholand.runasp.net/api/Attachment';

  uploadImage(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload-image`, formData);
  }

    uploadVideo(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseUrl}/upload-video`, formData);
  }


  
}
