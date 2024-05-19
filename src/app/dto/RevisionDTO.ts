
export class RevisionDTO {
    constructor(
        public codigoEstablecimiento: string = '',
        public descripcion: string = '',
        public estado: string = '',
        public fecha: string = '',
        public codigoModerador: string = '',
    ) { }
}