export class RegisterDTO {
    constructor(
        public nombre: string = '',
        public nickname: string = '',
        public email: string = '',
        public contrasena: string = '',
        public foto: string = '',
        public ciudadResidencia: string = '',
    ) {}
}