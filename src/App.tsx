import { useCallback, useMemo } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow'
import type { Connection, EdgeProps } from 'reactflow'
import CustomNode from 'components/CustomNode'
import CustomEdge from 'components/CustomEdge'

import { initialNodes, initialEdges } from 'data/flowData'

import 'App.css'
import 'reactflow/dist/style.css'

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const nodeType = useMemo(
    () => ({
      customNode: CustomNode
    }),
    []
  )
  const edgeType = useMemo(
    () => ({
      customEdge: (props: EdgeProps) => (
        <CustomEdge handleEdge={handleEdge} {...props} />
      )
    }),
    []
  )

  const handleEdge = (id: string) => {
    setEdges((eds) => eds.filter((e) => e.id !== id))
  }

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) => {
        return addEdge(
          {
            ...params,
            type: 'customEdge'
          },
          eds
        )
      }),
    [setEdges]
  )

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
        edgeTypes={edgeType}
        onConnect={onConnect}
      />
    </div>
  )
}

export default App
