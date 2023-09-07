import type { Node, Edge } from 'reactflow'
import { DataType } from 'types'

export const initialNodes: Node<DataType>[] = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: {
            type: 'server',
            name: 'Server_1',
            status: 'online'
        },
        type: 'customNode'
    },
    {
        id: '2',
        position: { x: 100, y: 100 },
        data: {
            type: 'server',
            name: 'Server_2',
            status: 'offline'
        },
        type: 'customNode'
    },
    {
        id: '3',
        position: { x: -100, y: 100 },
        data: {
            type: 'pc',
            name: 'PC_1',
            status: 'connecting'
        },
        type: 'customNode'
    },
    {
        id: '4',
        position: { x: 0, y: 200 },
        data: {
            type: 'server',
            name: 'Server_3',
            status: 'online'
        },
        type: 'customNode'
    },
    {
        id: '5',
        position: { x: 100, y: 300 },
        data: {
            type: 'pc',
            name: 'PC_3',
            status: 'online'
        },
        type: 'customNode'
    },
    {
        id: '6',
        position: { x: -100, y: 300 },
        data: {
            type: 'pc',
            name: 'PC_4',
            status: 'connecting'
        },
        type: 'customNode'
    },

]
export const initialEdges: Edge[] = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'straight',
        style: { stroke: 'red' }
    },
    {
        id: 'e1-3',
        source: '1',
        target: '3',
        type: 'straight',
        style: { stroke: 'blue' },
        animated: true
    },
    {
        id: 'e2-4',
        source: '2',
        target: '4',
        type: 'straight',
        style: { stroke: 'red' }
    },
    {
        id: 'e1-4',
        source: '1',
        target: '4',
        type: 'straight',
        style: { stroke: 'black' }
    },
    {
        id: 'e4-5',
        source: '4',
        target: '5',
        type: 'straight',
        style: { stroke: 'black' }
    },
    {
        id: 'e4-6',
        source: '4',
        target: '6',
        type: 'straight',
        style: { stroke: 'blue' },
        animated: true
    },
]