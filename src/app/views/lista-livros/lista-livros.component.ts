import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, map, filter, debounceTime, catchError, throwError } from 'rxjs';
import { Item, } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 3000;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl('');
  mensagemErro = '';

  constructor(
    private service: LivroService
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter(busca => busca.length >= 3),
    switchMap(busca => this.service.buscar(busca)),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError(erro => {
      console.log(erro);
      return throwError(() => new Error(this.mensagemErro = 'Erro ao buscar livros, tente novamente mais tarde'))
    })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => new LivroVolumeInfo(item));
  }
}



