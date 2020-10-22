const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
(() => {
    const element = document.querySelector('.status-page__updated-at')
    const updatedAt = element.textContent
    const array = updatedAt.replace(/As of /g, '').replace(/  /g, ' ').replace(/,/g, '').split(' ')
    const month = (months.indexOf(array[0]) + 1) + '월'
    const day = array[1].replace(/[^0-9]/g, '') + '일'
    const time = array[3].replace('AM', '오전').replace('PM', '오후') + ' ' + array[2]
    element.textContent = month + ' ' + day + ' ' + time + ' 부터'
})()
const initPanels = () => {
    $('div.d-flex.flex-column > div > span').each((index, element) => {
        const uptime = element.textContent.replace(/\n/g, '').split(' ')
        if (uptime[4] && uptime[4] !== '중') {
            const unit = uptime[6].includes('days') ? '일' : uptime[6].includes('months') ? '달' : '년'
            const newUptime = uptime[5] + unit + '동안 ' + uptime[0] + ' 업타임 유지 중'
            element.textContent = newUptime
        }
    })
    $('.status-page__resource-ticks.mt-2 > div').each((index, element) => {
        const text = element.getAttribute('title')
        if (text) {
            const date = text.split('<br/>')[0].replace(/\n/g, '').replace('  ', ' ').split(' ')
            if (!date[0].endsWith('년')) {
                const newDate = date[2] + '년 ' + (months.indexOf(date[0]) + 1) + '월 ' + date[1].replace(',', '일')
                let status = text.split('<br/>')[1]
                if (status.includes('Down for')) {
                    status = status
                        .replace('Down for', '').replace('and ', '')
                        .replace(' minutes', '분').replace(' hours', '시간')
                        .replace(' days', '일').replace(' months', '달')
                        .replace(' years', '년') + ' 동안 오프라인'
                } else if (status.includes('Operational')) {
                    status = '온라인'
                } else {
                    status = '확인 안됨'
                }
                element.setAttribute('title', newDate + '<br/>' + status)
            }
        }
    })
    $('[data-toggle="tooltip"]').tooltip({
        boundary: 'window'
    })
}
window.onload = () => {
    $('div[data-onload="initTooltips()"]').each((index, element) => {
        element.setAttribute('data-onload', 'initPanels()')
    })
}
