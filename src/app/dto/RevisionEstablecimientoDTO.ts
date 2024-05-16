
export class RevisionEstablecimientoDTO {
    constructor(
        public _id: string = '',
        public nombre: string = '',
        public descripcion: string = '',
        public codigoUsuario: string = '',
        public imagenes: string[] = [],
        public estado: string = '',
    ) { }
}