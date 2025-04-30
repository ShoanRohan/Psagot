import React from 'react';

/**
 * קומפוננטת טבלה דינמית
 * @param {Object} props - פרופס של הקומפוננטה
 * @param {string[]} props.columns - מערך של שמות העמודות
 * @param {Array<Object>} props.data - מערך של אובייקטים המכילים את הנתונים
 * @param {string} [props.className] - קלאס אופציונלי לעיצוב הטבלה
 */


const Table = ({ columns, data, className = '' }) => {
  
    // בדיקה שקיבלנו את הפרמטרים הנדרשים
  if (!columns || !Array.isArray(columns) || columns.length === 0) {
    console.error('Table component: columns prop is required and must be a non-empty array');
    return <div>Error: Invalid columns configuration</div>;
  }

  if (!data || !Array.isArray(data)) {
    console.error('Table component: data prop is required and must be an array');
    return <div>Error: Invalid data configuration</div>;
  }

  return (
    <div className={`table-container ${className}`}>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={`header-${index}`}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {columns.map((column, colIndex) => {
                // מניחים שהמפתחות באובייקטי הנתונים תואמים לשמות העמודות
                // או שיש מפתח מיוחד שמתאים לכל עמודה
                const cellKey = column.toLowerCase().replace(/\s+/g, '_');
                return (
                  <td key={`cell-${rowIndex}-${colIndex}`}>
                    {row[cellKey] !== undefined ? row[cellKey] : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
