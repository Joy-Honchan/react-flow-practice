import { useMemo } from 'react'
import { Handle, Position } from 'reactflow'
import { DataType } from 'types'
import ComputerIcon from '@mui/icons-material/Computer'
import StorageIcon from '@mui/icons-material/Storage'

import './CustomNode.css'
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
      <div className="custom-node">
        {icon}
        <div className="custom-node-name">{data.name}</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  )
}

export default CustomNode
