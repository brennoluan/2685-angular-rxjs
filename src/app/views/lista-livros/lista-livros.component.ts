import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { switchMap, map, filter, debounceTime, catchError, throwError, EMPTY, of } from 'rxjs';
import { Item, LivrosResultado, } from 'src/app/models/interfaces';
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
  livrosResultado: LivrosResultado

  constructor(
    private service: LivroService
  ) { }

  totalDeLivros$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter(busca => busca.length >= 3),
    switchMap(busca => this.service.buscar(busca)),
    map((resultado) => this.livrosResultado = resultado),
    catchError((erro) => {
      console.log(erro);
      return of();
    })
  )

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    debounceTime(PAUSA),
    filter(busca => busca.length >= 3),
    switchMap(busca => this.service.buscar(busca)),
    map((resultado) => this.livrosResultado = resultado),
    map((resultado) => resultado.items ?? []),
    map((items) => this.livrosResultadoParaLivros(items)),
    catchError((erro) => {
      /*this.mensagemErro = 'Erro ao buscar livros, recarregue a aplicação';
      return EMPTY;*/

      console.log(erro);
      return throwError(() => new Error(this.mensagemErro = 'Erro ao buscar livros, recarregue a aplicação'));

    })
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => new LivroVolumeInfo(item));
  }
}



