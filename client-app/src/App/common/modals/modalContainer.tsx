import React, { useContext } from 'react'
import { Modal } from 'semantic-ui-react'
import { RouteStoreContext } from '../../stores/rootStore'
import { observer } from 'mobx-react-lite'

  const ModalContainer = () => {
    const rootstore=useContext(RouteStoreContext)
    const{modal:{open,body},closeModal}=rootstore.modalstore
    return (
       <Modal open={open} onClose={closeModal} size='mini'>
           <Modal.Content >
               {body}
            </Modal.Content>
       </Modal>
    )
}
export default observer(ModalContainer);