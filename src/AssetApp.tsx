import { useState } from "react";
import "./AssetApp.css";
import { CustomHeader } from "./component/CustomHeader";
import { useAssets } from "./hooks/useAssets";
import { AssetTable } from "./component/AssetTable";
import { AssetModal } from "./component/AssetModal";
import { MessageModal } from "./component/MessageModal";
import { DeleteSuccessModal } from "./component/DeleteSuccessModal";
import type { Asset } from "./interface/asset.interface";

export const AssetApp = () => {
   const { response, loading, addAsset, editAsset, deleteAsset } = useAssets();
   const [showModal, setShowModal] = useState(false);
   const [newAsset, setNewAsset] = useState<Asset>({
      name: "",
      owner: "",
      type: "",
   });
   const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
   const [saving, setSaving] = useState(false);
   const [message, setMessage] = useState<string | null>(null);
   const [successMessage, setSuccessMessage] = useState<string | null>(null);

   const openNewModal = () => {
      setEditingAsset(null);
      setNewAsset({ name: "", owner: "", type: "" });
      setShowModal(true);
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSaving(true);
      const msg = editingAsset
         ? await editAsset(newAsset)
         : await addAsset(newAsset);
      setMessage(msg);
      setSaving(false);
      setShowModal(false);
   };

   const handleDelete = async (id: number) => {
      if (!confirm("¿Seguro quieres eliminar este asset?")) return;
      setSaving(true);
      const msg = await deleteAsset(id);
      setSaving(false);
      setSuccessMessage(msg);
   };

   if (loading) return <p className="loading-text">Cargando inventario...</p>;

   return (
      <div className="asset-app">
         <CustomHeader
            title="Listador de Assets"
            description="Lista todo el inventario de assets disponible"
         />

         <button className="add-asset-button" onClick={openNewModal}>
            Agregar asset
         </button>

         <div className="asset-content">
            <AssetTable
               assets={response}
               onEdit={(a) => {
                  setEditingAsset(a);
                  setNewAsset(a);
                  setShowModal(true);
               }}
               onDelete={handleDelete}
            />
         </div>

         {showModal && (
            <AssetModal
               asset={newAsset}
               saving={saving}
               editing={!!editingAsset}
               onClose={() => setShowModal(false)}
               onSubmit={handleSubmit}
               onChange={(field, value) =>
                  setNewAsset({ ...newAsset, [field]: value })
               }
            />
         )}

         {message && (
            <MessageModal message={message} onClose={() => setMessage(null)} />
         )}
         {successMessage && (
            <DeleteSuccessModal
               message={successMessage}
               onClose={() => setSuccessMessage(null)}
            />
         )}
      </div>
   );
};
