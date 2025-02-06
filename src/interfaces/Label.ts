export interface LabelDTO {
    name: string,
}

export default interface Label {
    id: string,
    name: string,
    createdAt: string,
    albumId: string,
}