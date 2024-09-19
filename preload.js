const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    

    //DATA INSERT
    //New guest registration
    insert_data: (data) => ipcRenderer.send('insert_data', data),

    //Reassign guest
    reassign_visitor: (data) => ipcRenderer.send('reassign_visitor', data),

    //Quick Search
    //By name
    search_by_name: (data) => ipcRenderer.invoke('search_by_name', data),
    //By doc
    search_by_doc: (data) => ipcRenderer.invoke('search_by_doc', data),

    //Date Picker
    search_by_calendar: (data) => ipcRenderer.invoke('search_by_calendar', data),

    find_one: (id) => ipcRenderer.invoke('find_one', id),



    // STATISTICS
    //Entries today
    today_entries_call: () => ipcRenderer.invoke('today_entries_call'),

    //Entries this month
    month_entries_call: (data) => ipcRenderer.invoke('month_entries_call', data),

    //All entries
    all_data_call: (data) => ipcRenderer.invoke('all_data_call', data),
})

