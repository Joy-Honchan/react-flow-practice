import { useState, FormEvent, ChangeEvent } from 'react'
// import { useReactFlow } from 'reactflow'

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
  //   x,
  //   y,
  handleCloseMenu
}: PaneMenuProps) => {
  const [formValue, _] = useState({
    name: '',
    type: ''
  })
  //   const { project, setNodes, getNodes } = useReactFlow()
  const handleChange = <T,>(e: ChangeEvent<T>) => {
    console.log(e.currentTarget)
  }
  const handleAddNode = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const nodes = getNodes()
    // const nextNodeNumber =
    //   Math.max(...nodes.map(({ id }) => Number(id.match(/\d+/)))) + 1
    // const newNode = {
    //   id: `${nextNodeNumber}`,
    //   position: project({
    //     x,
    //     y
    //   }),
    //   data: {
    //     name: 'unKnown',
    //     type: 'server',
    //     status: 'offline'
    //   },
    //   type: 'customNode'
    // }
  }
  return (
    <form
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
      onSubmit={handleAddNode}
    >
      <div>
        <label htmlFor="name">Device Name</label>
        <input
          value={formValue.name}
          onChange={handleChange}
          id="name"
          style={{ lineHeight: '1.5' }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label htmlFor="type">Device Type</label>
        <select
          value={formValue.name}
          onChange={handleChange}
          id="type"
          style={{
            width: '177px',
            height: '1.5rem',
            padding: '1px 2px',
            border: '2px solid black',
            fontSize: '1rem'
          }}
        >
          <option value="server" style={{ fontSize: '1rem' }}>
            Server
          </option>
          <option value="pc" style={{ fontSize: '1rem' }}>
            PC
          </option>
        </select>
      </div>
      <div style={{ display: 'flex', marginTop: '2rem' }}>
        <button
          type="submit"
          style={{ display: 'block', flex: 1, padding: '0.4rem 0.5rem' }}
        >
          Add Node
        </button>
        <button
          style={{ display: 'block', flex: 1, padding: '0.4rem 0.5rem' }}
          onClick={handleCloseMenu}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default PaneMenu
