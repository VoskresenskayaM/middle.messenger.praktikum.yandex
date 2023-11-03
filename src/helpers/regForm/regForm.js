export default function regForm(options) {
    return `<form class="login__form">
    ${options.fn(this)}
    </form>`
}
