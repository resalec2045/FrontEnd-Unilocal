export class DetalleClienteDTO {
    constructor(
      public codigo: string = '',
      public nombre: string = '',
      public foto: string = '',
      public nickName: string = '',
      public email: string = '',
      public ciudadResidencia: number = 0,
    ) {}
  }
  