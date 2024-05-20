export class ItemRevisionDTO {
  constructor(
    public codigo: string = '',
    public codigoEstablecimiento: string = '',
    public descripcion: string = '',
    public estado: string = '',
    public fecha: string = '',
    public codigoModerador: string = ''
  ) {}
}
