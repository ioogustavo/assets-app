interface MessageModalProps {
   message: string;
   onClose: () => void;
}

export const MessageModal = ({ message, onClose }: MessageModalProps) => (
   <div className="modal-overlay">
      <div className="modal">
         <p>{message}</p>
         <button onClick={onClose}>Cerrar</button>
      </div>
   </div>
);
