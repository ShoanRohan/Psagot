import Button from '@mui/material/Button';
import { FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';

export const ExportIconButton = ({
  data,
  fileName = "export",
  sheetName = "Sheet1",
}) => {
  const handleExport = () => {
    console.log("🔍 Exporting data:", data); // כאן בדיקה של הנתונים

    if (!Array.isArray(data) || data.length === 0) {
      alert("אין נתונים לייצא");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  return (
    <Button
      onClick={handleExport}
      size="small"
      startIcon={<FileDown size={30} />}
    >
    </Button>
  );
};
