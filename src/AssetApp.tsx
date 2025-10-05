import { useState } from "react";
import "./AssetApp.css";
import { CustomHeader } from "./component/CustomHeader";
import { useAssets } from "./hooks/useAssets";
import type { Asset } from "./interface/asset.interface";

export const AssetApp = () => {
   const { response, loading, addAsset, editAsset, deleteAsset } = useAssets();
   const [showModal, setShowModal] = useState(false);
   const [newAsset, setNewAsset] = useState<Asset>({
      name: "",
      owner: "",
      type: "",
   });
   const [saving, setSaving] = useState(false);
   const [message, setMessage] = useState<string | null>(null);
   const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      const msg = await addAsset(newAsset);
      setMessage(msg);
      setSaving(false);
      setShowModal(false);
      setNewAsset({
         name: "",
         owner: "",
         type: "",
      });
   };

   const handleEditClick = (asset: Asset) => {
      setEditingAsset(asset);
      setNewAsset({
         id: asset.id, // necesario para identificar cuál asset editar
         name: asset.name,
         type: asset.type,
         owner: asset.owner,
      });
      setShowModal(true);
   };

   const handleEditSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingAsset) return; // seguridad

      setSaving(true);

      const msg = await editAsset(newAsset); // se envía id + cambios

      setMessage(msg);
      setSaving(false);
      setShowModal(false);
      setEditingAsset(null);
      setNewAsset({
         name: "",
         owner: "",
         type: "",
      });
   };

   const handleDelete = async (id: number) => {
      if (!confirm("¿Seguro quieres eliminar este asset?")) return;
      setSaving(true);
      const msg = await deleteAsset(id);
      setSaving(false);
      setSuccessMessage(msg);
   };

   let content;
   if (loading) {
      content = <p className="loading-text">Cargando inventario...</p>;
   } else if (response.length === 0) {
      content = <p className="empty-text">No hay assets disponibles.</p>;
   } else {
      content = (
         <table className="asset-table">
            <thead>
               <tr className="table-header">
                  <th className="table-cell">ID</th>
                  <th className="table-cell">Nombre</th>
                  <th className="table-cell">Tipo</th>
                  <th className="table-cell">Propietario</th>
                  <th className="table-cell">Creado</th>
                  <th className="table-cell">Actualizado</th>
                  <th className="table-cell">Editar</th>
                  <th className="table-cell">Eliminar</th>
               </tr>
            </thead>
            <tbody>
               {response.map((asset) => (
                  <tr key={asset.id} className="table-row">
                     <td className="table-cell">{asset.id}</td>
                     <td className="table-cell">{asset.name}</td>
                     <td className="table-cell">{asset.type}</td>
                     <td className="table-cell">{asset.owner}</td>
                     <td className="table-cell">
                        {asset.created_at
                           ? new Date(asset.created_at).toLocaleString()
                           : "-"}
                     </td>
                     <td className="table-cell">
                        {asset.updated_at
                           ? new Date(asset.updated_at).toLocaleString()
                           : "-"}
                     </td>
                     <td className="table-cell">
                        <button
                           className="edit-button"
                           onClick={() => handleEditClick(asset)}
                        >
                           Editar
                        </button>
                     </td>
                     <td>
                        <button
                           className="delete-button"
                           onClick={() => handleDelete(asset.id!)}
                        >
                           Eliminar
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      );
   }

   return (
      <div className="asset-app">
         <CustomHeader
            title="Listador de Assets"
            description="Lista todo el inventario de assets disponible"
         />

         <button
            className="add-asset-button"
            onClick={() => {
               setShowModal(true);
               setNewAsset({ name: "", owner: "", type: "" });
               setShowModal(true);
            }}
         >
            Agregar asset
         </button>

         <div className="asset-content">{content}</div>

         {showModal && (
            <div className="modal-overlay">
               <div className="modal">
                  {/* Título dinámico según modo */}
                  <h2>
                     {editingAsset ? "Editar Asset" : "Agregar Nuevo Asset"}
                  </h2>

                  {/* Submit dinámico según modo */}
                  <form
                     onSubmit={editingAsset ? handleEditSubmit : handleSubmit}
                     className="modal-form"
                  >
                     <div className="form-group">
                        <label>
                           Nombre:
                           <input
                              type="text"
                              name="name"
                              value={newAsset.name}
                              onChange={(e) =>
                                 setNewAsset({
                                    ...newAsset,
                                    name: e.target.value,
                                 })
                              }
                              required
                              disabled={saving} // bloquea input mientras guarda
                           />
                        </label>
                     </div>

                     <div className="form-group">
                        <label>
                           Tipo:
                           <input
                              type="text"
                              name="type"
                              value={newAsset.type}
                              onChange={(e) =>
                                 setNewAsset({
                                    ...newAsset,
                                    type: e.target.value,
                                 })
                              }
                              required
                              disabled={saving} // bloquea input mientras guarda
                           />
                        </label>
                     </div>

                     <div className="form-group">
                        <label>
                           Propietario:
                           <input
                              type="text"
                              name="owner"
                              value={newAsset.owner}
                              onChange={(e) =>
                                 setNewAsset({
                                    ...newAsset,
                                    owner: e.target.value,
                                 })
                              }
                              required
                              disabled={saving} // bloquea input mientras guarda
                           />
                        </label>
                     </div>

                     <div className="modal-buttons">
                        <button type="submit" disabled={saving}>
                           {saving ? "Guardando..." : "Guardar"}
                        </button>
                        <button
                           type="button"
                           onClick={() => {
                              setShowModal(false);
                              setEditingAsset(null);
                              setNewAsset({ name: "", owner: "", type: "" });
                           }}
                           disabled={saving} // bloquea salir mientras guarda
                        >
                           Cancelar
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}

         {message && (
            <div className="modal-overlay">
               <div className="modal">
                  <p>{message}</p>
                  <button onClick={() => setMessage(null)}>Cerrar</button>
               </div>
            </div>
         )}

         {successMessage && (
            <div className="modal-overlay">
               <div className="modal success-modal">
                  <h2>✅ Asset Eliminado</h2>
                  <p>{successMessage}</p>
                  <div className="modal-buttons">
                     <button
                        type="button"
                        onClick={() => setSuccessMessage(null)}
                     >
                        Cerrar
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};
