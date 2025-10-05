import type { Asset } from "../interface/asset.interface";

interface AssetTableProps {
   assets: Asset[];
   onEdit: (asset: Asset) => void;
   onDelete: (id: number) => void;
}

export const AssetTable = ({ assets, onEdit, onDelete }: AssetTableProps) => {
   if (assets.length === 0) {
      return <p className="empty-text">No hay assets disponibles.</p>;
   }

   return (
      <table className="asset-table">
         <thead>
            <tr className="table-header">
               <th>ID</th>
               <th>Nombre</th>
               <th>Tipo</th>
               <th>Propietario</th>
               <th>Creado</th>
               <th>Actualizado</th>
               <th>Editar</th>
               <th>Eliminar</th>
            </tr>
         </thead>
         <tbody>
            {assets.map((asset) => (
               <tr key={asset.id}>
                  <td>{asset.id}</td>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                  <td>{asset.owner}</td>
                  <td>
                     {asset.created_at
                        ? new Date(asset.created_at).toLocaleString()
                        : "-"}
                  </td>
                  <td>
                     {asset.updated_at
                        ? new Date(asset.updated_at).toLocaleString()
                        : "-"}
                  </td>
                  <td>
                     <button
                        className="edit-button"
                        onClick={() => onEdit(asset)}
                     >
                        Editar
                     </button>
                  </td>
                  <td>
                     <button
                        className="delete-button"
                        onClick={() => onDelete(asset.id!)}
                     >
                        Eliminar
                     </button>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};
