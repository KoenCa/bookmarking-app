// Modules
const { ipcRenderer } = require('electron')

// Show add-modal
$('.open-add-modal').click(() => {
    $('#add-modal').addClass('is-active')
})

$('.close-add-modal').click(() => {
    $('#add-modal').removeClass('is-active')
})

// Handle add-modal submission
$('#add-button').click(() => {
    // Get URL from input
    let newItemUrl = $('#item-input').val()
    if (newItemUrl) {

        // Disable modal ui
        $('#item-input').prop('disabled', true)
        $('#add-button').addClass('is-loading')
        $('.close-add-modal').addClass('is-disabled')


        // Send URL to main process via IPC
        ipcRenderer.send('new-item', newItemUrl)
    }
})

// Listen for new item from main
ipcRenderer.on('new-item-success', (e, item) => {
    console.log(item)

    // Close and reset modal
    $('#add-modal').removeClass('is-active')
    $('#item-input').prop('disabled', false).val('')
    $('#add-button').removeClass('is-loading')
    $('.close-add-modal').removeClass('is-disabled')
})

// Simulate add click on enter
$('#item-input').keyup((e) => {
    if (e.key === 'Enter') {
        $('#add-button').click()
    }
})