import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class ServiceProvider {

    serve: string = 'http://192.168.100.14/Servidores/Servidor-Gerenciador/';
 // serve: string = 'http://192.168.100.19/Servidores/Servidor-Gerenciador/';

  constructor(public http: HttpClient) { }

  postData(body,file){
    
    let headers =  new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8'});
    let options = ({ headers:headers});

    return this.http.post(this.serve + file,
           JSON.stringify(body),options)
           .timeout(59000)
           .map(res => res);
  }

}


