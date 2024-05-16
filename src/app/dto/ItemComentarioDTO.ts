export class ItemComentarioDTO {
    constructor(
      public codigoComentario: string = '',
      public codigoUsuario: string = '',
      public nombreUsuario: string = '',
      public fotoUsuario: string = '',
      public resenia: string = '',
      public respuesta: string = '',
      public valoracion: number = 0,
    ) {}
  }
  