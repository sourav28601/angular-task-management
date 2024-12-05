export interface GetAllEvent {
    id:number;
    name: string;
    description: string;
    date: string;
    type:string;
}

export interface CustomResponse {
    totalCount: number;
    message: String,
    data: GetAllEvent[]
}