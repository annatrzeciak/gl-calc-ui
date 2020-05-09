<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header ">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="close">
                Cancel
              </button>

              <button
                v-for="button in showAdditionalButtons"
                :key="button.id"
                @click="$emit(button.event)"
                :disabled="button.disabled"
              >
                {{ button.name }}
              </button>
              <button v-if="showConfirm" class="modal-default-button" @click="confirm">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  props: {
    showConfirm: { type: Boolean, default: true, required: false },
    showAdditionalButtons: { type: Array, default: () => [], required: false },
    width: { type: Number, default: 33, required: false }
  },
  mounted() {
    // TODO: Set focus to modal window on open
  },
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm");
      this.close();
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  box-shadow: 0px 0px 10px 2px rgba(255, 255, 255, 0.5);
  background: #fff;
  border-radius: 3px;
  width: 60%;
  max-width: 1000px;
  max-height: 100%;
  overflow-y: auto;
  margin-left: auto;
  margin-right: auto;
  display: inline-block;
}

.modal-container {
  padding: 20px 30px;
  border-radius: 2px;
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
  margin-top: 0;
  * {
    margin-top: 0;
  }
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
