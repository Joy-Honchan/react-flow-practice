import { Panel } from 'reactflow'
import ErrorIcon from '@mui/icons-material/Error'
import { useState } from 'react'
const InfoPanel = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Panel position="top-left">
      <div className="info-container">
        <div className="title">
          <div className="icon-container" title="使用說明" onClick={handleOpen}>
            <ErrorIcon />
            <span className={`${open ? '' : 'display-none'}`}>使用說明</span>
          </div>
          <div className={`${open ? '' : 'display-none'}`}>
            <button onClick={handleClose}>X</button>
          </div>
        </div>
        <div className={`${open ? '' : 'display-none'}`}>
          <p>
            <strong>設備顏色</strong>
          </p>
          <p>綠色:正常 黃色:連線中 紅色:離線</p>
          <p>
            <strong>連線狀態</strong>
          </p>
          <p>黑色實線:正常 藍色虛線:連線中 紅色實線:連線異常</p>
          <p>
            <strong>新增連線</strong>
          </p>
          <p>
            點擊任一設備下方黑點後拖曳到另一設備上方黑點即可新增連線。點擊 X
            則刪除該連線
          </p>
          <p>
            <strong>新增設備</strong>
          </p>
          <p>在圖中點擊右鍵，開啟新增設備視窗。點擊 X 則刪除該設備</p>
        </div>
      </div>
    </Panel>
  )
}

export default InfoPanel
