import { Controls, ControlButton } from 'reactflow'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

const CustomControl = ({ handleReset }: { handleReset: () => void }) => {
  return (
    <Controls>
      <ControlButton onClick={handleReset}>
        <RestartAltIcon />
      </ControlButton>
    </Controls>
  )
}

export default CustomControl
