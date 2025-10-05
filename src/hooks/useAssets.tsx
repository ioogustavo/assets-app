import { useState, useEffect } from "react";
import {
   getAllAssets,
   postAsset,
   removeAsset,
   updateAsset,
} from "../actions/callsApi";
import type { Asset } from "../interface/asset.interface";

export const useAssets = (): {
   response: Asset[];
   loading: boolean;
   setResponse: React.Dispatch<React.SetStateAction<Asset[]>>;
   addAsset: (asset: Asset) => Promise<string>;
   editAsset: (asset: Asset) => Promise<string>;
   deleteAsset: (id: number) => Promise<string>;
} => {
   const [assets, setAssets] = useState<Asset[]>([]);
   const [loading, setLoading] = useState(true);

   const fetchAssets = async () => {
      try {
         const res = await getAllAssets();
         if (Array.isArray(res)) {
            setAssets(res);
         } else {
            console.error("La respuesta no es un array:", res);
            setAssets([]);
         }
      } catch (err) {
         console.error("Error al cargar assets:", err);
         setAssets([]);
      } finally {
         setLoading(false);
      }
   };

   const addAsset = async (asset: Asset): Promise<string> => {
      const res = await postAsset(asset);
      if (res.asset) setAssets([res.asset, ...assets]);
      return res.message;
   };

   const editAsset = async (asset: Asset): Promise<string> => {
      const res = await updateAsset(asset);
      if (res.asset) {
         setAssets((prev) =>
            prev.map((a) => (a.id === asset.id ? res.asset! : a))
         );
      }
      await fetchAssets();
      return res.message;
   };

   const deleteAsset = async (id: number): Promise<string> => {
      const res = await removeAsset(id);
      if (res.success) {
         setAssets((prev) => prev.filter((a) => a.id !== id));
      }
      return res.message;
   };

   useEffect(() => {
      fetchAssets();
   }, []);

   return {
      response: assets,
      loading,
      setResponse: setAssets,
      addAsset,
      editAsset,
      deleteAsset,
   };
};
