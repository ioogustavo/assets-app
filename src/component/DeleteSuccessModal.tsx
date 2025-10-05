interface DeleteSuccessModalProps {
   message: string;
   onClose: () => void;
}

export const DeleteSuccessModal = ({
   message,
   onClose,
}: DeleteSuccessModalProps) => (
   <div className="modal-overlay">
      <div className="modal success-modal">
         <h2>✅ Asset Eliminado</h2>
         <p>{message}</p>
         <div className="modal-buttons">
            <button type="button" onClick={onClose}>
               Cerrar
            </button>
         </div>
      </div>
   </div>
);
