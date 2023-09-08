export interface PaneMenuProps {
  top?: number
  left?: number
  right?: number
  bottom?: number
  handleCloseMenu: () => void
}
const PaneMenu = ({
  top,
  left,
  right,
  bottom,
  handleCloseMenu
}: PaneMenuProps) => {
  return (
    <div
      style={{
        zIndex: 10,
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        backgroundColor: 'red'
      }}
    >
      <button style={{ display: 'block', padding: '0.4rem 0.5rem' }}>
        Add Node
      </button>
      <button
        style={{ display: 'block', width: '100%', padding: '0.4rem 0.5rem' }}
        onClick={handleCloseMenu}
      >
        Cancel
      </button>
    </div>
  )
}

export default PaneMenu
