import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    textAlign: "center",
    padding: theme.spacing(1, 2),
  },
  [`&.${TableCell.body}`]: {
    textAlign: "center",
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f9fbff",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export function lightenColor(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.min(255, Math.floor(r + (255 - r) * percent));
  g = Math.min(255, Math.floor(g + (255 - g) * percent));
  b = Math.min(255, Math.floor(b + (255 - b) * percent));

  return `rgb(${r}, ${g}, ${b})`;
}