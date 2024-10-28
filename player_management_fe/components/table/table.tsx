import React, { useEffect, useState } from 'react';

interface Column {
    header: string;
    accessor: string;
    type: any;
}

interface TableProps {
    columns: Column[];
    data: Record<string, any>[];
    title: string;
    showOptionalButton?: boolean;
    onViewButtonClick?: (item: Record<string, any>) => Promise<void> | Promise<any>;
    onDeleteButtonClick?: (item: Record<string, any>) => Promise<void> | Promise<any>;
    onRowsChange?: (rows: number) => void;
    getData: () => Promise<Record<string, any>[]>;
}

const Table: React.FC<TableProps> = ({
                                         columns,
                                         data,
                                         title,
                                         showOptionalButton = false,
                                         onViewButtonClick,
                                         onDeleteButtonClick,
                                         onRowsChange,
                                         getData,
                                     }) => {
    const [tableData, setTableData] = useState<Record<string, any>[]>(data);

    // Fetch data when the component mounts or when getData changes
    useEffect(() => {
        const fetchData = async () => {
            const fetchedData = await getData();
            setTableData(fetchedData);
            onRowsChange && onRowsChange(fetchedData.length); // Notify about row change
        };

        fetchData();
    }, [getData, onRowsChange]);

    return (
        <div>
            <h2>{title}</h2>
            <table>
                <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                    {showOptionalButton && <th>Actions</th>}
                </tr>
                </thead>
                <tbody>
                {tableData.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>
                                {typeof item[column.accessor] === 'boolean'
                                    ? item[column.accessor]
                                        ? 'Yes'
                                        : 'No'
                                    : item[column.accessor]}
                            </td>
                        ))}
                        {showOptionalButton && (
                            <td>
                                {onViewButtonClick && (
                                    <button onClick={() => onViewButtonClick(item)}>
                                        View
                                    </button>
                                )}
                                {onDeleteButtonClick && (
                                    <button onClick={() => onDeleteButtonClick(item)}>
                                        Delete
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
