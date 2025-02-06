export interface FaixaDTO {
    albumId: string,
    musicId: string,
}

export default interface Faixa {
    id: string, 
    musicId: string, 
    duration: number, 
    createdAt: string
    trackNumber: number, 
}