import { Horario } from '../../app/models/Horario';
import { Ubicacion } from '../../app/models/Ubicacion';

export class RegistroNegocioDTO {
  constructor(
    public imagenes: Array<string> = new Array<string>(),
    public descripcion: string = '',
    public nombre: string = '',
    public telefonos: Array<string> = new Array<string>(),
    public ubicacion: Ubicacion = new Ubicacion(),
    public horarios: Array<Horario> = new Array<Horario>(),
    public codigoUsuario: string = '',
    public categoria: string = ''
  ) {}
}
