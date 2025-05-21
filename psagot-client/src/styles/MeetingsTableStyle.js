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
