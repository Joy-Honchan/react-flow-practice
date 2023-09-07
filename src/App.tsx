import { useMemo } from 'react'
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow'
import CustomNode from 'components/CustomNode'

import { initialNodes, initialEdges } from 'data/flowData'

import 'App.css'
import 'reactflow/dist/style.css'

function App() {
  const nodeType = useMemo(() => ({ customNode: CustomNode }), [])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  return (
    <div
      className="flow-container"
      style={{ width: '500px', height: '500px', border: '3px solid black' }}
    >
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeType}
      />
    </div>
  )
}

export default App
