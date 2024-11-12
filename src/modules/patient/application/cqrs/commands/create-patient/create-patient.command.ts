import { Command, CommandProps } from "#/core/application/cqrs/command";

export class CreatePatientCommand extends Command {
  public readonly name: string;

  public readonly email: string;

  public readonly age: number;

  public readonly height: string;

  public readonly weight: string;

  public readonly document: string;

  public readonly gender?: string;

  public readonly phone: string;

  public readonly cep: string;

  public readonly address: string;

  public readonly birthDate: string;

  public readonly responsibleName?: string;

  public readonly responsibleDocument?: string;

  public constructor(props: CommandProps<CreatePatientCommand>) {
    super({ ...props })
    this.name = props.name;
    this.email = props.email;
    this.age = props.age;
    this.height = props.height;
    this.weight = props.weight;
    this.document = props.document;
    this.gender = props.gender;
    this.phone = props.phone;  
    this.cep = props.cep;
    this.address = props.address;
    this.birthDate = props.birthDate;
    this.responsibleName = props.responsibleName;
    this.responsibleDocument = props.responsibleDocument;
  }

  public static getName(): string {
    return "create_patient.command";
  }

  public readonly getName = (): string => CreatePatientCommand.getName();
}
