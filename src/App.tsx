import { useCallback, useMemo, MouseEvent, useState, useRef } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow'
import type { Connection } from 'reactflow'
import CustomNode from 'components/CustomNode'
import CustomEdge from 'components/CustomEdge'

import { initialNodes, initialEdges } from 'data/flowData'

import 'App.css'
import 'reactflow/dist/style.css'
import CustomControl from 'components/CustomControl'
import PaneMenu, { PaneMenuProps } from 'components/PaneMenu'

function App() {
  const [menu, setMenu] = useState<Omit<
    PaneMenuProps,
    'handleCloseMenu'
  > | null>(null)
  const flowRef = useRef<HTMLDivElement>(null)
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

  const onPaneContextMenu = useCallback(
    (event: MouseEvent) => {
      event.preventDefault()

      const pane = flowRef.current?.getBoundingClientRect()
      if (!pane) return
      const menuItem = {
        top:
          event.clientY - pane.top < pane.height - 200
            ? event.clientY - pane.top
            : undefined,
        left:
          event.clientX - pane.left < pane.width - 200
            ? event.clientX - pane.left
            : undefined,
        right:
          event.clientX - pane.left >= pane.width - 200
            ? pane.width - (event.clientX - pane.left)
            : undefined,
        bottom:
          event.clientY - pane.top >= pane.height - 200
            ? pane.height - (event.clientY - pane.top)
            : undefined,
        x: event.clientX - pane.left,
        y: event.clientY - pane.top
      }
      setMenu(menuItem)
    },
    [setMenu]
  )

  const handleCloseMenu = useCallback(() => {
    setMenu(null)
  }, [setMenu])
  return (
    <div
      className="flow-container"
      style={{
        width: '800px',
        height: '500px',
        border: '3px solid black'
      }}
    >
      <ReactFlow
        ref={flowRef}
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeType}
        edgeTypes={edgeType}
        onConnect={onConnect}
        onPaneClick={handleCloseMenu}
        onPaneContextMenu={onPaneContextMenu}
      >
        {menu && <PaneMenu {...menu} handleCloseMenu={handleCloseMenu} />}
        <CustomControl handleReset={handleReset} />
      </ReactFlow>
    </div>
  )
}

export default App
