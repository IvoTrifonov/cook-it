import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private url = "https://api.imgur.com/3/image";
  private clientId: string = "d965a7e41efe849";
  // imageLink: string;

  constructor(
    private http: HttpClient
  ) { }

  uploadImage(imageFile: File) : Observable<string> {
    const formData = new FormData();
    formData.append("image", imageFile, imageFile.name);

    let header = new HttpHeaders({
      "authorization": 'Client-ID ' + this.clientId
    });

    return this.http
      .post(this.url, formData, { headers: header })
      .pipe(
        map((result: { data: { link: string } }) => result.data.link)
      );
  }
}
