import { useCallback, useMemo } from 'react'
import { Handle, Position, useReactFlow } from 'reactflow'
import type { NodeProps } from 'reactflow'
import ComputerIcon from '@mui/icons-material/Computer'
import StorageIcon from '@mui/icons-material/Storage'

const CustomNode = ({ id, data }: NodeProps) => {
  const { setNodes, setEdges } = useReactFlow()
  const icon = useMemo(() => {
    const style = {
      padding: 2,
      borderRadius: 5,
      backgroundColor:
        data.status === 'online'
          ? '#51D182'
          : data.status === 'offline'
          ? '#FC7784'
          : data.status === 'connecting'
          ? '#EEE060'
          : '#bababa'
    }

    return data.type === 'server' ? (
      <StorageIcon style={style} />
    ) : (
      <ComputerIcon style={style} />
    )
  }, [data.type, data.status])

  const handleNodeDelete = useCallback(() => {
    setNodes((nds) => nds.filter((e) => e.id !== id))
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id))
  }, [])
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={{ margin: ' 0.2rem 0' }}>
        {icon}
        <div style={{ fontSize: '12px', fontWeight: '600' }}>
          {data.name}
          {data.status === 'new' ? (
            <button onClick={handleNodeDelete}>x</button>
          ) : null}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export default CustomNode
