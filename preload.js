const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    

    //DATA INSERT
    //New guest registration
    insert_data: (data) => ipcRenderer.send('insert_data', data),

    //Reassign guest
    reassign_visitor: (data) => ipcRenderer.send('reassign_visitor', data),


    //Quick Search
    //By name
    search_by_name: (data) => ipcRenderer.send('search_by_name', data),
    search_by_name_return: (data) => ipcRenderer.on("search_by_name_return", data).setMaxListeners(100),
    //By doc
    search_by_doc: (data) => ipcRenderer.send('search_by_doc', data),
    search_by_doc_return: (data) => ipcRenderer.on('search_by_doc_return', data).setMaxListeners(100),

    //Date Picker
    //Search by Month
    search_by_calendar: (data) => ipcRenderer.send('search_by_calendar', data),
    search_by_calendar_return: (data) => ipcRenderer.on('search_by_calendar_return', data),



    // STATISTICS
    //Entries today
    today_entries_call: (data) => ipcRenderer.send('today_entries_call', data),
    today_entries_return: (data) => ipcRenderer.on('today_entries_return', data),

    //Entries this month
    month_entries_call: (data) => ipcRenderer.send('month_entries_call', data),
    month_entries_return: (data) => ipcRenderer.on('month_entries_return', data),

    //All entries
    all_data_call: (data) => ipcRenderer.send('all_data_call', data),
    all_data_return: (data) => ipcRenderer.on('all_data_return', data),
})

