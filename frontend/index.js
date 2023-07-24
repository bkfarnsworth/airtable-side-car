import {
    initializeBlock,
    useBase,
    CellRenderer,
    useCursor, 
    useLoadable, 
    useWatchable,
    useRecordById,
} from '@airtable/blocks/ui';
import React from 'react';


function SideCarApp() {
    const base = useBase();
    const cursor = useCursor();
    const table = base.getTableById(cursor.activeTableId);
    const tagsField = table.getFieldByName("Tags");
    
    useLoadable(cursor); // load selected records and fields
    useWatchable(cursor, ['selectedRecordIds']); // re-render whenever the list of selected records changes

    let recordId = cursor.selectedRecordIds[0] || '';
    let record = useRecordById(table, recordId);

    if(!record){
        return <div>No record selected</div>;
    }    

    // Selected records: {cursor.selectedRecordIds.join(', ')}
    // Selected fields: {cursor.selectedFieldIds.join(', ')}

    return (
        <div style={{overflowWrap: 'anywhere'}}>
            <b>Name:</b>
            <div>{record.name}</div>
            <br/>
            <b>Link:</b>
            <div><a target="_blank" href={record.getCellValue("Link")}>{record.getCellValue("Link")}</a></div>
            <br/>
            <b>Tags:</b>
            <div><CellRenderer field={tagsField} record={record} /></div>
            <br/>
            <b>Notes:</b>
            <CellRenderer record={record} field={table.getFieldByName("Notes")}/>
            <br/>
        </div>
    );
}

initializeBlock(() => <SideCarApp />);
