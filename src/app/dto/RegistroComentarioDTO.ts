export class RegistroComentarioDTO {
  constructor(
    public codigoCliente: string = '',
    public codigoEstablecimiento: string = '',
    public fecha: string = '',
    public resenia: string = '',
    public valoracion: number = 0,
    public respuesta: string = ''
  ) {}
}
