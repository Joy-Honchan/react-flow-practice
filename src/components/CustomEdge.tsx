import { MouseEvent } from 'react'
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  useReactFlow
} from 'reactflow'

interface PropType extends EdgeProps {}
const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd
}: PropType) => {
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
    setEdges((eds) => eds.filter((e) => e.id !== id))
  }

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} />
      <EdgeLabelRenderer>
        <div
          className="custom-edge"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`
          }}
        >
          <button
            className="delete-btn"
            onClick={(event) => onEdgeClick(event, id)}
          >
            x
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  )
}

export default CustomEdge
