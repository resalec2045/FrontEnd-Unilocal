export class EmailDTO {
    constructor(
      public destinatario: string = '',
      public asunto: string = '',
      public cuerpo: string = ''
    ) {}
  }
  