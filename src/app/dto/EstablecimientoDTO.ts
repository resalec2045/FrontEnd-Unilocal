import { Horario } from '../models/Horario';
import { Ubicacion } from '../models/Ubicacion';

export class EstablecimientoDTO {
  constructor(
    public codigo: string = '',
    public imagenes: Array<string> = new Array<string>(),
    public descripcion: string = '',
    public nombre: string = '',
    public telefonos: Array<string> = new Array<string>(),
    public ubicacion: Ubicacion = new Ubicacion(),
    public horarios: Array<Horario> = new Array<Horario>(),
    public codigoUsuario: string = '',
    public categoria: string = '',
    public promedio: number = 0
  ) {}
}
