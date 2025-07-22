import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';
import excel from '../assets/icons/excel.png'
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
      
      style={{ width: '44.00000762939453px',
        height: '44.00000762939453px',
        left: '252px',
        borderRadius: '6.88px',
        justifyContent: 'space-between',
        paddingTop: '6.88px',
        paddingRight: '8px',
        paddingBottom: '6.88px',
        paddingLeft: '8px'
         }}



    >
      <img src= {excel} alt="ייצוא לאקסל" style={{height:'29px', width:'29px'}} />
    </Button>
  );
};

