import { useState, ChangeEvent } from 'react'
import { useReactFlow } from 'reactflow'

export interface PaneMenuProps {
  top?: number
  left?: number
  right?: number
  bottom?: number
  x: number
  y: number
  handleCloseMenu: () => void
}
const PaneMenu = ({
  top,
  left,
  right,
  bottom,
  x,
  y,
  handleCloseMenu
}: PaneMenuProps) => {
  const [deviceName, setDeviceName] = useState('')
  const [deviceType, setDeviceType] = useState('')
  const { project, setNodes, getNodes } = useReactFlow()
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.currentTarget.id === 'name') {
      setDeviceName(e.currentTarget.value)
    } else {
      setDeviceType(e.currentTarget.value)
    }
  }
  const handleAddNode = () => {
    const nodes = getNodes()
    const nextNodeNumber =
      Math.max(...nodes.map(({ id }) => Number(id.match(/\d+/)))) + 1
    const newNode = {
      id: `${nextNodeNumber}`,
      position: project({
        x,
        y
      }),
      data: {
        name: deviceName,
        type: deviceType,
        status: 'offline'
      },
      type: 'customNode'
    }
    setNodes((nds) => nds.concat(newNode))
    handleCancel()
  }

  const handleCancel = () => {
    setDeviceName(() => '')
    setDeviceType(() => '')
    handleCloseMenu()
  }

  return (
    <div
      style={{
        zIndex: 10,
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        border: '2px solid black',
        maxWidth: '200px',
        padding: '1.5rem 0 0 0',
        backgroundColor: 'white'
      }}
    >
      <div>
        <label htmlFor="name">Device Name</label>
        <input
          value={deviceName}
          onChange={handleChange}
          id="name"
          style={{ lineHeight: '1.5' }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="type">Device Type</label>
        <select
          value={deviceType}
          onChange={handleChange}
          id="type"
          style={{
            height: '25.98px',
            width: '177px',
            padding: '1px 2px',
            fontSize: '1rem'
          }}
        >
          <option hidden value="" />
          <option value="server">Server</option>
          <option value="pc">PC</option>
        </select>
      </div>
      <div style={{ display: 'flex', marginTop: '2rem' }}>
        <button
          onClick={handleAddNode}
          style={{ display: 'block', flex: 1, padding: '0.4rem 0.5rem' }}
        >
          Add Node
        </button>
        <button
          onClick={handleCancel}
          style={{ display: 'block', flex: 1, padding: '0.4rem 0.5rem' }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default PaneMenu
