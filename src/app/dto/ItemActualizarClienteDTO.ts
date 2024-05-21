export class ItemActualizarClienteDTO {
    constructor(
        public codigo: string = '',
        public nombre: string = '',
        public foto: string = '',
        public email: string = '',
        public ciudadResidencia: string = '',
    ) {}
}