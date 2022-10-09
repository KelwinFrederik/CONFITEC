import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup,  FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';  
import { AppComponentService } from './app.component.service';
import { EscolaridadeEnum } from './Model/EscolaridadeEnum';
import { Usuario } from './Model/Usuarios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  Usuarios : any;
  UsuariosObs = new Observable<Usuario[]>;
  UsuarioIdUpdate = '';
  formUsuario!: FormGroup;

  constructor
  (
    private formBuilder: FormBuilder,
    private AppComponentService: AppComponentService
  )
  {}

  ngOnInit() {
    this.createForm(new Usuario());
    this.loadUsuarios();
  }

  createForm(usuario: Usuario) {
    this.formUsuario = this.formBuilder.group({
      nome: [usuario.nome, [Validators.required]],
      sobrenome: [usuario.sobrenome, [Validators.required]],
      email:[usuario.email, [Validators.required, Validators.pattern(/.+@.+\..+/)]],
      escolaridade: [usuario.escolaridade, [Validators.required, Validators.min(1)]],
      dataNascimento: [usuario.dataNascimento]
    })
  }

  loadUsuarios() {  
    this.AppComponentService.getAllUsuarios().subscribe
      (retorno => 
      {
         this.Usuarios = retorno;
      }, 
      err => 
      {
         alert(err);
      }
    );  
  } 

  onSubmit() {
    if(!this.formUsuario.valid){
      alert("Existem informações inválidas.")
      return;
    }

    this.createUsuario(this.formUsuario.value); 
    this.formUsuario.reset(new Usuario())
  }

  createUsuario(Usuario: Usuario) {
    if (this.UsuarioIdUpdate == '') {  
      this.AppComponentService.createUsuario(Usuario).subscribe(  
        () => { this.loadUsuarios(); }, err =>{alert(err.message);});  
    } else {  
      Usuario.id = Number(this.UsuarioIdUpdate);  
      this.AppComponentService.updateUsuario(Usuario.id, Usuario).subscribe(() => {  
        this.loadUsuarios();  
        this.UsuarioIdUpdate = '';  
        this.formUsuario.reset();  
      }, err =>{alert(err.message);});  
    }  
  }  

  loadUsuarioToEdit(id: number) {  
    this.AppComponentService.getUsuarioById(id).subscribe( usuario => {  
      this.UsuarioIdUpdate = usuario.id.toString();  
      
      this.formUsuario.controls['nome'].setValue(usuario.nome);  
      this.formUsuario.controls['sobrenome'].setValue(usuario.sobrenome);  
      this.formUsuario.controls['email'].setValue(usuario.email);  
      this.formUsuario.controls['escolaridade'].setValue(usuario.escolaridade);
      this.formUsuario.controls['dataNascimento'].setValue(usuario.dataNascimento.toString().split('T')[0]);

      this.validateDataNascimento(usuario.dataNascimento.toString());
    }, err =>{alert(err.message);});    
  } 

  deleteUsuario(id: number) {  
    if (confirm("Deseja realmente deletar este Usuario ?")) {   
      this.AppComponentService.deleteUsuarioById(id).subscribe(() => {  
        this.loadUsuarios();  
        this.UsuarioIdUpdate = '';
      }, err =>{alert(err.message);});  
    }  
  }

  getEscolaridade(escolaridade: number){
    return EscolaridadeEnum[escolaridade];
  }

  validateDataNascimento(dataNascimento: string){
    if(new Date(dataNascimento) > new Date())
      this.formUsuario.controls['dataNascimento'].setErrors({'incorrect': true})
    else
      this.formUsuario.controls['dataNascimento'].setErrors(null);
  }

  resetFormUsuarios(){
    this.createForm(new Usuario());
  }
}