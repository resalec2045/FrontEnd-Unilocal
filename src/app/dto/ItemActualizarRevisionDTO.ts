export class ItemActualizarRevisionDTO {
  constructor(
    public codigoEstablecimiento: string = '',
    public codigoModerador: string = '',
    public descripcion: string = ''
  ) {}
}
