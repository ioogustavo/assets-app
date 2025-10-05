import type { Asset } from "../interface/asset.interface";

interface AssetModalProps {
   asset: Asset;
   saving: boolean;
   editing: boolean;
   onClose: () => void;
   onSubmit: (e: React.FormEvent) => void;
   onChange: (field: keyof Asset, value: string) => void;
}

export const AssetModal = ({
   asset,
   saving,
   editing,
   onClose,
   onSubmit,
   onChange,
}: AssetModalProps) => {
   return (
      <div className="modal-overlay">
         <div className="modal">
            <h2>{editing ? "Editar Asset" : "Agregar Nuevo Asset"}</h2>

            <form onSubmit={onSubmit} className="modal-form">
               {["name", "type", "owner"].map((field) => (
                  <div className="form-group" key={field}>
                     <label>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                        <input
                           type="text"
                           name={field}
                           value={(asset as any)[field]}
                           onChange={(e) =>
                              onChange(field as keyof Asset, e.target.value)
                           }
                           required
                           disabled={saving}
                        />
                     </label>
                  </div>
               ))}

               <div className="modal-buttons">
                  <button type="submit" disabled={saving}>
                     {saving ? "Guardando..." : "Guardar"}
                  </button>
                  <button type="button" onClick={onClose} disabled={saving}>
                     Cancelar
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};
