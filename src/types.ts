export interface DataType {
    type: string
    name: string
    status: 'online' | 'offline' | 'connecting' | 'new'
}