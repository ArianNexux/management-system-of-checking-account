import Instituition from "../entities/instituition.entity";

type ListInstituitionInputDTO = {
    limit: number;
    page: number;
};
export default interface InstituitionGateway {
    add(entity: Instituition): Promise<void>;
    update(id: string, entity: Instituition): Promise<void>;
    list(params: ListInstituitionInputDTO): Promise<Instituition[]>;
    find(id: string): Promise<Instituition>
}
