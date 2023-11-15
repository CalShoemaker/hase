
import MuiToolbar, { ToolbarProps } from '@mui/material/Toolbar';
import { styled } from "@mui/material/styles";

export const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  backdropFilter: "blur(20px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  px: [1]
}));

export default Toolbar;