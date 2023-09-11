import { ChangeEvent, useReducer } from 'react'
import { useReactFlow } from 'reactflow'
import type { Node } from 'reactflow'
import { DataType } from 'types'

export interface PaneMenuProps {
  top?: number
  left?: number
  right?: number
  bottom?: number
  x: number
  y: number
  handleCloseMenu: () => void
}

interface FormDataType {
  formData: { name: string; type: string }
  errorMsg: { name: string; type: string }
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
  const initialValue = {
    formData: { name: '', type: '' },
    errorMsg: { name: '', type: '' }
  }
  const [
    {
      formData: { name: deviceName, type: deviceType },
      errorMsg: { name: deviceNameError, type: deviceTypeError }
    },
    dispatch
  ] = useReducer(formReducer, initialValue)
  const { project, setNodes, getNodes } = useReactFlow<DataType>()
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!e.currentTarget.id) return
    dispatch({
      type: `${e.currentTarget.id}-change`,
      payload: e.currentTarget.value
    })
    dispatch({
      type: `${e.currentTarget.id}-error`,
      payload: ''
    })
  }
  const handleAddNode = () => {
    const nodes = getNodes()
    const nodeNameList = nodes.map(({ data: { name } }) => name)
    let isError = false
    // validation
    if (!deviceName) {
      dispatch({ type: 'name-error', payload: 'Name is required' })
      isError = true
    }
    if (nodeNameList.includes(deviceName)) {
      dispatch({ type: 'name-error', payload: 'Name already exists' })
      isError = true
    }
    if (!deviceType) {
      dispatch({ type: 'type-error', payload: 'Type is required' })
      isError = true
    }
    if (isError) {
      return
    }
    // add node
    const nextNodeNumber =
      Math.max(...nodes.map(({ id }) => Number(id.match(/\d+/)))) + 1
    const newNode: Node<DataType> = {
      id: `${nextNodeNumber}`,
      position: project({
        x,
        y
      }),
      data: {
        name: deviceName,
        type: deviceType,
        status: 'new'
      },
      type: 'customNode'
    }
    setNodes((nds) => nds.concat(newNode))
    handleCancel()
  }

  const handleCancel = () => {
    dispatch({ type: 'clear-inputs', payload: '' })
    handleCloseMenu()
  }

  return (
    <div
      className="pane-menu"
      style={{
        top,
        left,
        right,
        bottom
      }}
    >
      <div>
        <label htmlFor="name">Device Name</label>
        <input
          value={deviceName}
          onChange={handleChange}
          id="name"
          className={`name-input ${deviceNameError ? 'input-error' : null}`}
        />
        {deviceNameError ? (
          <span className="error-msg">{deviceNameError}</span>
        ) : null}
      </div>
      <div className={`${deviceNameError ? 'shrink-mt' : null} type-container`}>
        <label htmlFor="type">Device Type</label>
        <select
          value={deviceType}
          onChange={handleChange}
          id="type"
          className={`type-select ${deviceTypeError ? 'input-error' : null}`}
        >
          <option hidden value="" />
          <option value="server">Server</option>
          <option value="pc">PC</option>
        </select>
        {deviceTypeError ? (
          <span className="error-msg">{deviceTypeError}</span>
        ) : null}
      </div>
      <div className={`${deviceTypeError ? 'shrink-mt' : null} btn-container`}>
        <button onClick={handleAddNode} className="btn">
          Add Node
        </button>
        <button onClick={handleCancel} className="btn">
          Cancel
        </button>
      </div>
    </div>
  )
}

export default PaneMenu

function formReducer(
  state: FormDataType,
  action: { payload: string; type: string }
) {
  switch (action.type) {
    case 'name-change':
      return {
        ...state,
        formData: {
          ...state.formData,
          name: action.payload
        }
      }
    case 'type-change':
      return {
        ...state,
        formData: {
          ...state.formData,
          type: action.payload
        }
      }
    case 'name-error':
      return {
        ...state,
        errorMsg: {
          ...state.errorMsg,
          name: action.payload
        }
      }
    case 'type-error':
      return {
        ...state,
        errorMsg: {
          ...state.errorMsg,
          type: action.payload
        }
      }
    case 'clear-inputs':
      return {
        formData: {
          name: '',
          type: ''
        },
        errorMsg: {
          name: '',
          type: ''
        }
      }
    default:
      return state
  }
}
