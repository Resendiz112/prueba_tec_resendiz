import { Component, inject, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-cupones',
  imports: [],
  templateUrl: './cupones.html',
  styleUrl: './cupones.css',
})
export class Cupones implements OnInit {

  private api = inject(Api);
  public listaMarcas: any [] = [];
  public listaMarcasAll:any [] =[];
  limiteMarcas: number = 12;
  categorias:string[]=[];
  categoriaActiva:string='Destacado';
  vistaActual: 'grid' | 'lista' = 'grid';
  public listaMarcasCashback:any [] =[];


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.listaCategorias();
    this.listaCupones();
    this.listaCashback();

  }


  listaCategorias(){

    const metodo = 'lista_categorias';

    this.api.obtenerDatos(metodo).subscribe({
      next: (response:any) => {
       const nombres = response.Categorias.map((item:any)=> item.nombre_categoria);
       this.categorias= ['Destacado', ...nombres];

      }
    })
  }
  CategoriaSeleccionada(name:string){
    this.categoriaActiva= name;

  }

  listaCupones(): void{

    const metodo= 'lista_marcas'

    this.api.obtenerDatos(metodo).subscribe({
      next:(response:any)=>{
        this.listaMarcasAll= response.Marcas.map((item:any)=>{
          return{
            logo: item.logo_marca,
            nombre: item.nombre_marca,
            promo: item.promo_marca
          };
      });
      this.listaMarcas = this.listaMarcasAll.slice(0,this.limiteMarcas);
    }

    })
  }
   masCupones():void{
      this.limiteMarcas +=12;
      this.listaMarcas=this.listaMarcasAll.slice(0, this.limiteMarcas);
   }

  cambiarVista(vista: 'grid'|'lista'): void{
    this.vistaActual= vista;
  }

  ordenarCupones(evento:any):void{
    const opcion = evento.target.value;
    if(opcion === 'asc') {
      this.listaMarcasAll.sort((a,b)=> a.nombre.localeCompare(b.nombre));

    } else if (opcion === 'desc'){
      this.listaMarcasAll.sort((a,b)=> b.nombre.localeCompare(a.nombre))
    } else {
      this.listaMarcasAll= [...this.listaMarcasAll].sort(() =>Math.random()-0.5);
    }
    this.listaMarcas = this.listaMarcasAll.slice(0, this.limiteMarcas);

  }

  listaCashback():void{
    const metodo = 'lista_marcas';

    this.api.obtenerDatos(metodo).subscribe({
      next:(response:any) =>{
        const Cashback = response.Marcas.map((item:any) =>{
          return{
            logo:item.logo_marca,
            imagen:item.imagen_marca,
            nombre:item.nombre_marca,
            promo:item.promo_marca

          };
        });
        this.listaMarcasCashback= Cashback.slice(0,4);
        console.log('Cashback: ',this.listaMarcasCashback);
      }
    })
  }


}
