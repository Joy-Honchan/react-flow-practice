import ReactFlow from 'reactflow'
import type { Node, Edge } from 'reactflow'
import 'App.css'
import 'reactflow/dist/style.css'

interface DataType {
  type: string
  name: string
}

function App() {
  const initialNodes: Node<DataType>[] = [
    {
      id: '1',
      position: { x: 0, y: 0 },
      data: {
        type: 'server',
        name: 'Server_1'
      }
    },
    {
      id: '2',
      position: { x: 100, y: 100 },
      data: {
        type: 'server',
        name: 'Server_2'
      }
    },
    {
      id: '3',
      position: { x: -100, y: 100 },
      data: {
        type: 'pc',
        name: 'PC_1'
      }
    },
    {
      id: '4',
      position: { x: 0, y: 200 },
      data: {
        type: 'pc',
        name: 'PC_2'
      }
    }
  ]
  const initialEdges: Edge[] = [
    {
      id: 'e1-2',
      source: '1',
      target: '2'
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3'
    },
    {
      id: 'e2-4',
      source: '2',
      target: '4'
    }
  ]
  return (
    <div
      className="flow-container"
      style={{ width: '500px', height: '500px', border: '3px solid black' }}
    >
      <ReactFlow fitView nodes={initialNodes} edges={initialEdges} />
    </div>
  )
}

export default App
