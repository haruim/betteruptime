addEventListener("fetch", event => {
    event.passThroughOnException()
    event.respondWith(handleRequest(event.request))
})

const toReplace = {
    "하루 상태 페이지": /하루 status/g, // Title
    "status-header__label'>상태 페이지": /status-header__label'>Status/g, // Navbar text
    "서포트 서버": /Get in touch/g, // Get in touch URL
    "모든 서비스가 온라인이에요": /All services are online/g,
    "일부 서비스가 오프라인이에요": /Some services are down/g,
    "온라인": /Operational/g,
    "오프라인": /Downtime/g,
    "확인 안됨": /Not monitored/g,
    "서비스별 상태": /Current status by service/g,
}

async function handleRequest(request) {
    const response = await fetch(request)
    let html = await response.text()
    for (const key of Object.keys(toReplace)) {
        html = html.replace(toReplace[key], key)
    }
    html = html.replace("</body>", `
    <script src="https://haruim.github.io/betteruptime/custom.js"></script>
    </body>
    `)
    return new Response(html, {
        headers: response.headers
    }) 
}
