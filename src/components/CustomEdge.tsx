import { MouseEvent } from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow
} from 'reactflow'

interface PropType extends EdgeProps {
  // handleEdge: (id: string) => void
}
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd
}: // handleEdge
PropType) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })
  const { setEdges } = useReactFlow()

  const onEdgeClick = (_: MouseEvent<HTMLButtonElement>, id: string) => {
    // handleEdge(id)
    setEdges((eds) => eds.filter((e) => e.id !== id))
  }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all'
          }}
        >
          <button onClick={(event) => onEdgeClick(event, id)}>×</button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default CustomEdge
