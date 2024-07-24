<script lang="ts">
import { ref } from 'vue'
import { Modal } from 'bootstrap';

export default {
    props: {
        shown: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: 'title'
        },
        focusedElementId: {
            type: String,
            default: ''
        }
    },


    mounted() {

        var modalDiv = document.getElementById('awesumModalDiv');
        if (!modalDiv) {
            modalDiv = document.createElement('div');
            modalDiv.style.height = '0px';
            modalDiv.style.width = '0px';
            modalDiv.style.position = 'absolute';
            modalDiv.id = 'awesumModalDiv';
            document.body.prepend(modalDiv);
        }

        modalDiv.appendChild(this.$el);

        this.modal = new Modal(this.$el);
        let returnToElement = document.activeElement as HTMLElement;
        this.$el.addEventListener('show.bs.modal', () => {
            returnToElement = document.activeElement as HTMLElement;
            document.getElementById(this.focusedElementId).focus()
            this.$emit('shown');
        })
        this.$el.addEventListener('shown.bs.modal', () => {
            document.getElementById(this.focusedElementId).focus()
            this.$emit('shown');
        })
        this.$el.addEventListener('hidden.bs.modal', () => {
            returnToElement.focus();
            this.$emit('hidden');
        })

    },
    setup(props) {
        const modal = ref({} as Modal);
        return {
            modal
        }
    },
    watch: {
        shown: function (val) {
            if (val) {
                this.modal.show();
            } else {
                this.modal.hide();
            }
        }
    }
}
</script>

<template>
    <div class="modal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
                    <button id="awesumModalCloseButton" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<style scoped></style>