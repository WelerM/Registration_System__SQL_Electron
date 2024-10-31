const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    
    //First visit
    insert_data: (data) => ipcRenderer.send('insert_data', data),

    //New visit
    new_visit: (data) => ipcRenderer.send('new_visit', data),

    //Search by name input
    search_by_name: (data) => ipcRenderer.invoke('search_by_name', data),
    
    //Search by document input
    search_by_doc: (data) => ipcRenderer.invoke('search_by_doc', data),

    //Date picker input
    search_by_calendar: (data) => ipcRenderer.invoke('search_by_calendar', data),

    //Date picker input
    search_by_period: (data) => ipcRenderer.invoke('search_by_period', data),

    //Find one visit
    find_one: (id) => ipcRenderer.invoke('find_one', id),



    // STATISTICS
    //Visits today
    today_visits: () => ipcRenderer.invoke('today_visits'),

    //Visits this month
    month_visits: (data) => ipcRenderer.invoke('month_visits', data),

    //All visits
    all_visits: (data) => ipcRenderer.invoke('all_visits', data),
})

