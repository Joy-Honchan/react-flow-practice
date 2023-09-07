import { useMemo } from 'react'
import { Handle, Position } from 'reactflow'
import { DataType } from 'types'
import ComputerIcon from '@mui/icons-material/Computer'
import StorageIcon from '@mui/icons-material/Storage'

const CustomNode = ({ data }: { data: DataType }) => {
  const icon = useMemo(() => {
    const style = {
      padding: 2,
      borderRadius: 5,
      backgroundColor:
        data.status === 'online'
          ? '#51D182'
          : data.status === 'offline'
          ? '#FC7784'
          : '#EEE060'
    }

    return data.type === 'server' ? (
      <StorageIcon style={style} />
    ) : (
      <ComputerIcon style={style} />
    )
  }, [data.type, data.status])
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div style={{ margin: ' 0.2rem 0' }}>
        {icon}
        <div style={{ fontSize: '12px', fontWeight: '600' }}>{data.name}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export default CustomNode
