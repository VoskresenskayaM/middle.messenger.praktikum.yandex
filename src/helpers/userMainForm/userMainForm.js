export default function userMainForm(options) {
    return `<form class="user__info-form">
   ${options.fn(this)}
    </form>`
}
