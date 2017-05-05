// Track items with array
// If the app is required load the items from storage
// if there are no items null is returned so if it is null switch to empty array
exports.toreadItems = JSON.parse(localStorage.getItem('toreadItems')) || []

// Save items to localstorage
exports.saveItems = () => {
    localStorage.setItem('toreadItems', JSON.stringify(this.toreadItems))
}

// Toggle item as selected
exports.selectItem = (e) => {
    $('.read-item').removeClass('is-active') // remove selection from previous active class
    $(e.currentTarget).addClass('is-active')
}

// Select next/prev item
exports.changeItem = (direction) => {

    // Get current active item
    let activeItem = $('.read-item.is-active')

    // Check direction and get next or previous read-item
    let newItem = (direction === 'down') ? activeItem.next('.read-item') : activeItem.prev('.read-item')

    // Only if item exists, make selection change
    if (newItem.length) {
        activeItem.removeClass('is-active')
        newItem.addClass('is-active')        
    }

}

// Open item for reading
exports.openItem = () => {

    // only if items have been added
    if (!this.toreadItems.length) return

    // get selected item
    let targetItem = $('.read-item.is-active')

    // get item's content url (encoded)
    let contentURL = encodeURIComponent(targetItem.data('url'))

    // Reader window URL + url of the items website
    let readerWinURL = `file://${__dirname}/reader.html?url=${contentURL}`

    // open item in new proxy BrowserWindow
    let readerWin = window.open(readerWinURL, targetItem.data('title'))  
}

// Add new item
exports.addItem = (item) => {

    // Hide no items message
    $('#no-items').hide()

    // New item html
    let itemHTML = `<a class="panel-block read-item" data-url="${item.url}" data-title="${item.title}">
                        <figure class="image has-shadow is-64x64 thumb">
                            <img src="${item.screenshot}">
                        </figure>
                        <h2 class="title is-4 column">${item.title}</h2>
                    </a>`

    // Append to read-list
    $('#read-list').append(itemHTML)

    // Attach select event 
    // First remove all existing click handlers, than add the new ones
    // Happens for every new item added
    $('.read-item')
        .off('click, dblclick')
        .on('click', this.selectItem)
        .on('dblclick', this.openItem)
}