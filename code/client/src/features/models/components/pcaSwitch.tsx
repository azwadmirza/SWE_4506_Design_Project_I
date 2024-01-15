import * as React from 'react';
import Switch from '@mui/material/Switch';
import { alpha, styled } from '@mui/material/styles';  // Update the import statement
import { green } from '@mui/material/colors';


const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[500],
    '&:hover': {
      backgroundColor: alpha(green[500], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[500],
  },
}));

interface ColorSwitchProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
}

const ColorSwitch: React.FC<ColorSwitchProps> = ({ onChange, checked }) => {
  return (
    <GreenSwitch
      onChange={() => onChange(checked)}
      checked={!checked}
      inputProps={{ 'aria-label': 'Green switch demo' }}
    />
  );
};

export { ColorSwitch };;
