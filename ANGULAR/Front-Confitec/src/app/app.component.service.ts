
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Usuario } from './Model/Usuarios';

var httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
@Injectable({ providedIn: 'root' })

export class AppComponentService {
    url = 'https://localhost:7073/api/Usuarios';

    constructor(private http: HttpClient) { }

    getAllUsuarios(): Observable<Usuario[]> 
    {
        return this.http.get<Usuario[]>(this.url);
    }

    getUsuarioById(Usuarioid: number): Observable<Usuario> 
    {
        const apiurl = `${this.url}/${Usuarioid}`;
        return this.http.get<Usuario>(apiurl);  
    } 

    createUsuario(Usuario: Usuario): Observable<Usuario> 
    {  
        return this.http.post<Usuario>(this.url, Usuario, httpOptions);  
    }

    updateUsuario(Usuarioid: number, Usuario: Usuario): Observable<Usuario> 
    {
        const apiurl = `${this.url}/${Usuarioid}`;
        return this.http.put<Usuario>(apiurl,Usuario, httpOptions);  
    }

    deleteUsuarioById(Usuarioid: number): Observable<number> 
    {
        const apiurl = `${this.url}/${Usuarioid}`;
        return this.http.delete<number>(apiurl, httpOptions);  
    }  
}