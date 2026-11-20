import { Component, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, switchMap, map } from 'rxjs';
import { Item, Livro } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  campoBusca = new FormControl('');

  constructor(
    private service: LivroService
  ) { }

  livrosEncontrados$ = this.campoBusca.valueChanges.pipe(
    switchMap(busca => this.service.buscar(busca)),
    map((items) => this.livrosResultadoParaLivros(items)),
  );

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => new LivroVolumeInfo(item));
  }
}



