
export class ErrorDefault extends Error {
    public readonly dateThisError: Date;
    public readonly dataError: unknown;

    constructor(
        messageError = "Erro desconhecido",
        dataError: unknown = {}
    ) {
        super(messageError);

        this.name = "ErrorDefault";
        this.dateThisError = new Date();
        this.dataError = dataError;

        Object.setPrototypeOf(this, ErrorDefault.prototype);
    }
}