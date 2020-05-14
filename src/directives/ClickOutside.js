// Detect Clicks Outside an Element
// https://tahazsh.com/detect-outside-click-in-vue
// use:
// v-click-outside="{
//     exclude: ['button'],
//     handler: 'onClose'
//   }"
// "handler" to specify the name of the method that will handle the outside-click event
// in "exclude" we add an array of reference names of the elements that we don't want to trigger the outside-click event

let handleOutsideClick;
export default {
  bind(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation();
      const { handler, exclude } = binding.value;
      let clickedOnExcludedEl = false;
      exclude.forEach(refName => {
        if (!clickedOnExcludedEl) {
          const excludedEl = vnode.context.$refs[refName];
          if (excludedEl && !Array.isArray(excludedEl)) {
            clickedOnExcludedEl = excludedEl.contains(e.target);
          } else if (excludedEl) {
            clickedOnExcludedEl = excludedEl.includes(e.target);
          }
        }
      });
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        vnode.context[handler]();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
  },

  unbind() {
    document.removeEventListener("click", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  }
};
