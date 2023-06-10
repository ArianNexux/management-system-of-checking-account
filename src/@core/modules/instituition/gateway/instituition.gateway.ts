import Instituition from "../domain/instituition.entity";

type ListInstituitionInputDTO = {
    limit: number;
    page: number;
};
export default interface InstituitionGateway {
    add(entity: Instituition): Promise<void>;
    update(entity: Instituition): Promise<void>;
    find(id: string): Promise<Instituition>
}
