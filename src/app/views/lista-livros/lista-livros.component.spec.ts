import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { ListaLivrosComponent } from './lista-livros.component';
import { LivroService } from 'src/app/service/livro.service';

describe('ListaLivrosComponent', () => {
  let component: ListaLivrosComponent;
  let fixture: ComponentFixture<ListaLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaLivrosComponent ],
      imports: [CommonModule, FormsModule],
      providers: [{
        provide: LivroService,
        useValue: { buscar: () => of([]) }
      }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('maps every search result to a book', () => {
    const livros = component.livrosResultadoParaLivros([
      { volumeInfo: { title: 'Livro 1', imageLinks: { thumbnail: 'capa-1' } } },
      { volumeInfo: { title: 'Livro 2' } }
    ]);

    expect(livros).toHaveSize(2);
    expect(livros[0]).toEqual(jasmine.objectContaining({
      title: 'Livro 1',
      thumbnail: 'capa-1'
    }));
    expect(livros[1]).toEqual(jasmine.objectContaining({
      title: 'Livro 2'
    }));
  });

  it('returns an empty list when the response has no items', () => {
    expect(component.livrosResultadoParaLivros([])).toEqual([]);
  });
});
