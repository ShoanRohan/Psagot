import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import excel from '../assets/icons/excel.png';

export const ExportIconButton = ({
  data,
  fileName = 'export',
  sheetName = 'Sheet1',
}) => {
  const handleExport = () => {
    console.log('🔍 Exporting data:', data); // בדיקה של הנתונים

    if (!Array.isArray(data) || data.length === 0) {
      alert('אין נתונים לייצוא');
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
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '6.88px',
        justifyContent: 'space-between',
        padding: '6.88px 8px',
      }}
    >
      <img src={excel} alt="ייצוא לאקסל" style={{ height: '29px', width: '29px' }} />
    </Button>
  );
};