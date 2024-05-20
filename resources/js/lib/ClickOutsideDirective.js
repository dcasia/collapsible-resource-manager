export default {
    mounted: function (element, binding) {

        element.clickOutsideEvent = function (event) {

            if (!(element === event.target || element.contains(event.target))) {
                binding.value(event, element)
            }

        }

        document.addEventListener('click', element.clickOutsideEvent)

    },
    unmounted: element => {
        document.removeEventListener('click', element.clickOutsideEvent)
    },
}
