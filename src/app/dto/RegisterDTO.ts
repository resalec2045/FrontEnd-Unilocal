export class RegisterDTO {
    constructor(
        public nombre: string = '',
        public nickName: string = '',
        public email: string = '',
        public contrasena: string = '',
        public foto: string = '',
        public ciudadResidencia: string = '',
    ) {}
}