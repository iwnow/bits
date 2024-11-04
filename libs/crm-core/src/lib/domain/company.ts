import { frmGroup } from "bits-frms";
import { DTOCompany } from "../server/dto";


export class Company implements DTOCompany {
    id: number;

    name: string;
}