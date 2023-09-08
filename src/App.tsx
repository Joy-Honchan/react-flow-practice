import { useCallback, useMemo } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow'
import type { Connection } from 'reactflow'
import CustomNode from 'components/CustomNode'
import CustomEdge from 'components/CustomEdge'

import { initialNodes, initialEdges } from 'data/flowData'

import 'App.css'
import 'reactflow/dist/style.css'
import CustomControl from 'components/CustomControl'

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
      // customEdge: (props: EdgeProps) => (
      //   <CustomEdge handleEdge={handleEdge} {...props} />
      // )
      customEdge: CustomEdge
    }),
    []
  )

  // const handleEdge = useCallback((id: string) => {
  //   setEdges((eds) => eds.filter((e) => e.id !== id))
  // }, [])

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

  const handleReset = useCallback(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
  }, [setNodes, setEdges, initialNodes, initialEdges])

  return (
    <div
      className="flow-container"
      style={{ width: '800px', height: '500px', border: '3px solid black' }}
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
        // onPaneContextMenu={onPaneContextMenu}
      >
        <CustomControl handleReset={handleReset} />
      </ReactFlow>
    </div>
  )
}

export default App
