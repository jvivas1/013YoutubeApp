import { Injectable } from '@angular/core';
import {Http,URLSearchParams} from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class YoutubeService {

  private playlist:string="UU38aAjn1MJAApjSiYVdK50g";
  private YoutubeUrl:string="https://www.googleapis.com/youtube/v3";
  private apikey:string="AIzaSyDV3ThIBkMwPqnjfORprpAXZcVuxMzdmIE";

  private nextPageToken:string="CAoQAA";

  constructor(public http:Http) {

  }


  getVideos()
  {
      let url=`${this.YoutubeUrl}/playlistItems`;
      let params=new URLSearchParams();
      params.set('part','snippet');
      params.set('maxResults','10');
      params.set('playlistId',this.playlist);
      params.set('key',this.apikey);

      if(this.nextPageToken)
      {
        params.set('pagenToken',this.nextPageToken);

      }

      return this.http.get(url,{
        search:params
      }).map(res=>{
        console.log(res.json());
        this.nextPageToken=res.json().nextPageToken;

        let videos:any[]=[];

        for(let video of res.json().items)
        {
          let snippet=video.snippet;
          videos.push(snippet);
        }

        return videos;
      })
  }
}
