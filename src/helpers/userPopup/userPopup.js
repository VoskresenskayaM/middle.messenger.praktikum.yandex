export default function userPopup(options) {
   return `<section class="user__popup">
     ${options.fn(this)}
    </section>`
}